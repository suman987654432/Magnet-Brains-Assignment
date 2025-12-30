/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskDetailModal from "../components/TaskDetailModal.jsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
const API_URL = "http://localhost:5000/api/tasks";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [viewingTask, setViewingTask] = useState(null);
    const [filters, setFilters] = useState({
        priority: "",
        dueDate: "",
        status: "",
        search: "",
    });
    const [sortBy, setSortBy] = useState("");

    // Add a state to force re-render on login/logout
    const [authChange, setAuthChange] = useState(0);

    // Fetch tasks from API - only for logged-in user
    const loadTasks = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                console.log("No user logged in");
                setTasks([]);
                return;
            }
            
            console.log("Fetching tasks from:", API_URL);
            const res = await fetch(`${API_URL}?userId=${userId}`);
            console.log("Response status:", res.status);
            if (!res.ok) {
                console.error("Response not OK:", res.status, res.statusText);
                throw new Error("Failed to fetch tasks");
            }
            const data = await res.json();
            console.log("Loaded tasks:", data);
            setTasks(data);
        } catch (err) {
            console.error("Failed to load tasks", err);
            alert("Failed to load tasks. Make sure the backend is running on port 5000.");
        }
    };

    useEffect(() => {
        loadTasks();
    }, [authChange]); // Reload when authChange updates

    // Delete Task
    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) {
                alert("Failed to delete task");
                return;
            }
            alert("Task deleted successfully");
            // Reload tasks from API instead of filtering locally
            loadTasks();
        } catch (err) {
            console.error("Delete failed", err);
            alert("Error deleting task");
        }
    };

    // Drag & Drop
    const handleDrag = async (result) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        const updated = tasks.map((t) =>
            t._id === draggableId ? { ...t, status: destination.droppableId } : t
        );
        setTasks(updated);

        try {
            await fetch(`${API_URL}/${draggableId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: destination.droppableId }),
            });
        } catch (err) {
            console.error("Drag update failed", err);
        }
    };

    // Filtering and Sorting
    const TaskProcess = () => {
        let result = [...tasks];

        if (filters.priority)
            result = result.filter((t) => t.priority === filters.priority);

        if (filters.status)
            result = result.filter((t) => t.status === filters.status);

        if (filters.dueDate)
            result = result.filter(
                (t) => t.dueDate?.slice(0, 10) === filters.dueDate
            );

        if (filters.search)
            result = result.filter(
                (t) =>
                    t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                    t.description.toLowerCase().includes(filters.search.toLowerCase())
            );

        if (sortBy === "oldest")
            result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        if (sortBy === "newest")
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (sortBy === "closest")
            result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        return result;
    };

    // Handle filter/sort from Navbar
    const handleFilter = (type, value) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
    };
    const handleSort = (value) => setSortBy(value);
    const handleSearch = (value) => setFilters((prev) => ({ ...prev, search: value }));
    const handleReset = () => {
        setFilters({ priority: "", dueDate: "", status: "", search: "" });
        setSortBy("");
    };

    const handleAuthChange = () => {
        setAuthChange(prev => prev + 1); // Trigger reload
    };

    return (
        <>
            <Navbar
                onAddTask={() => setShowForm(true)}
                onFilter={handleFilter}
                onSort={handleSort}
                onSearch={handleSearch}
                onReset={handleReset}
                onLogoutSuccess={handleAuthChange}
            />

            {showForm && (
                <TaskForm
                    editingTask={editingTask}
                    onSave={() => {
                        setShowForm(false);
                        setEditingTask(null);
                        loadTasks();
                    }}
                />
            )}

            {viewingTask && (
                <TaskDetailModal
                    task={viewingTask}
                    onClose={() => setViewingTask(null)}
                />
            )}

            <DragDropContext onDragEnd={handleDrag}>
                <div className="max-w-[1600px] mx-auto px-6 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {["To-Do", "In-Progress", "Completed"].map((col) => (
                            <Droppable droppableId={col} key={col}>
                                {(p) => (
                                    <div className="flex flex-col h-[calc(100vh-140px)]">
                                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-t-xl border border-b-0 border-gray-200">
                                            <h3 className="text-base font-bold text-gray-800 text-center">
                                                {col}
                                            </h3>
                                            <p className="text-xs text-gray-500 text-center mt-0.5">
                                                {TaskProcess().filter((t) => t.status === col).length} tasks
                                            </p>
                                        </div>
                                        <div
                                            ref={p.innerRef}
                                            {...p.droppableProps}
                                            className="flex-1 bg-gray-50 p-4 rounded-b-xl border border-gray-200 overflow-y-auto space-y-4"
                                        >
                                            {TaskProcess()
                                                .filter((t) => t.status === col)
                                                .map((task, index) => (
                                                    <Draggable
                                                        key={task._id}
                                                        draggableId={task._id}
                                                        index={index}
                                                    >
                                                        {(p) => (
                                                            <div
                                                                ref={p.innerRef}
                                                                {...p.draggableProps}
                                                                {...p.dragHandleProps}
                                                            >
                                                                <TaskCard
                                                                    task={task}
                                                                    onView={() => setViewingTask(task)}
                                                                    onEdit={() => {
                                                                        setEditingTask(task);
                                                                        setShowForm(true);
                                                                    }}
                                                                    onDelete={() => deleteTask(task._id)}
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {p.placeholder}
                                            {TaskProcess().filter((t) => t.status === col).length === 0 && (
                                                <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                                                    No tasks in this column
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </div>
            </DragDropContext>
        </>
    );
};

export default Dashboard;

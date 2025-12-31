import { useState, useEffect } from "react";

const TaskForm = ({ editingTask, onSave }) => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        priority: "Low",
        status: "To-Do",
        dueDate: "",
    });


    useEffect(() => {
        if (editingTask) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInput({
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
                status: editingTask.status,
                dueDate: editingTask.dueDate?.slice(0, 10) || "",
            });
        }
    }, [editingTask]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        // here we get userid 
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("Please login first to create tasks");
            return;
        }
        const taskData = {
            ...input,
            userId: userId,
        };

        try {
            const url = editingTask
                ? `http://localhost:5000/api/tasks/${editingTask._id}`
                : "http://localhost:5000/api/tasks";

            const method = editingTask ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to save task");
                return;
            }

            alert(
                editingTask
                    ? "Task updated successfully"
                    : "Task created successfully"
            );
            onSave && onSave();
        } catch (err) {
            console.error("Error saving task:", err);
            alert("Error saving task");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {editingTask ? "Edit Task" : "Create New Task"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {editingTask
                            ? "Update task details below"
                            : "Fill in the details to create a new task"}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="px-8 py-6 space-y-6"
                >
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Task Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter task title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            value={input.title}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter task description"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                            value={input.description}
                            onChange={handleInput}
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Priority Level
                            </label>
                            <select
                                name="priority"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                value={input.priority}
                                onChange={handleInput}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Task Status
                            </label>
                            <select
                                name="status"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                value={input.status}
                                onChange={handleInput}
                            >
                                <option value="To-Do">To-Do</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Due Date
                        </label>
                        <input
                            type="date"
                            name="dueDate"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            value={input.dueDate}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            className="px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            onClick={onSave}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
                        >
                            {editingTask ? "Update Task" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;

import { useState, useEffect } from "react";
import { MdRefresh } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import TaskForm from "./TaskForm";
import Login from "./Login";

const Navbar = ({
  onAddTask,
  onFilter,
  onSort,
  onSearch,
  onReset,
  onLogoutSuccess, // Add new prop
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    alert("Logged out successfully");
    // Call callback to clear tasks in Dashboard
    if (onLogoutSuccess) onLogoutSuccess();
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    // Trigger task reload after login
    if (onLogoutSuccess) onLogoutSuccess();
  };

  return (
    <>
      <nav className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              
              <h2 className="text-2xl font-bold text-gray-800">Task Manager</h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                  value={search}
                  onChange={handleSearch}
                />
              </div>

              <select
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                onChange={(e) => onFilter && onFilter("priority", e.target.value)}
              >
                <option value="">All Priorities</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                type="date"
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                onChange={(e) => onFilter && onFilter("dueDate", e.target.value)}
              />

              <select
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                onChange={(e) => onFilter && onFilter("status", e.target.value)}
              >
                <option value="">All Status</option>
                <option>To-Do</option>
                <option>In-Progress</option>
                <option>Completed</option>
              </select>

              <select
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                onChange={(e) => onSort && onSort(e.target.value.toLowerCase())}
              >
                <option value="">Sort By</option>
                <option value="oldest">Oldest First</option>
                <option value="newest">Newest First</option>
                <option value="closest">Closest Due Date</option>
              </select>

              <button
                className="p-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                onClick={onReset}
                title="Reset Filters"
              >
                <MdRefresh size={20} />
              </button>
            </div>

            <div className="flex gap-3">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition shadow-sm"
                >
                  Login
                </button>
              )}
              <button
                onClick={onAddTask || (() => setShowTaskForm(true))}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </nav>
      {showTaskForm && (
        <TaskForm editingTask={null} onSave={() => setShowTaskForm(false)} />
      )}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Navbar;

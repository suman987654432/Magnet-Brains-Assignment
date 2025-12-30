import { format } from "date-fns";

const TaskDetailModal = ({ task, onClose }) => {
    if (!task) return null;

    const { title, description, priority, status, dueDate, createdAt } = task;

    const priorityStyles =
        priority === "High"
            ? "bg-red-50 text-red-700 border-red-200"
            : priority === "Medium"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200";

    const statusStyles =
        status === "Completed"
            ? "bg-green-200 text-green-700 border-green-200"
            : status === "In-Progress"
                ? "bg-blue-200 text-blue-700 border-blue-200"
                : "bg-gray-200 text-gray-700 border-gray-200";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <h2 className="text-2xl font-bold text-gray-800">Task Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition text-2xl font-bold"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${priorityStyles}`}>
                            {priority} Priority
                        </span>
                        <span className={`px-4 py-2 text-sm font-semibold rounded-full border ${statusStyles}`}>
                            {status}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Title</h3>
                        <p className="text-xl font-bold text-gray-800">{title}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h3>
                        <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Due Date</h3>
                            <p className="text-lg font-bold text-gray-800">
                                {format(new Date(dueDate), "MMMM dd, yyyy")}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Created On</h3>
                            <p className="text-lg font-bold text-gray-800">
                                {format(new Date(createdAt), "MMMM dd, yyyy")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;

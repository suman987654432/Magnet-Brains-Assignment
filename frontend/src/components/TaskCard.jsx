import { format } from "date-fns";

const TaskCard = ({ task, onEdit, onDelete }) => {
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${priorityStyles}`}>
                        {priority}
                    </span>
                    <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${statusStyles}`}>
                        {status}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {description}
                </p>

                <div className="space-y-2 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium">Due Date</span>
                        <span className="text-gray-700 font-semibold">
                            {format(new Date(dueDate), "MMM dd, yyyy")}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-medium">Created</span>
                        <span className="text-gray-700 font-semibold">
                            {format(new Date(createdAt), "MMM dd, yyyy")}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 p-4 bg-gray-50 border-t border-gray-100">
                <button
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                    onClick={onEdit}
                >
                    Edit
                </button>
                <button
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;

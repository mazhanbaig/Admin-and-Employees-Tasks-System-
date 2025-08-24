import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const statusColors = {
    "Not Started": "border-gray-400 text-gray-800",
    Pending: "border-yellow-400 text-yellow-700",
    Accepted: "border-blue-400 text-blue-700",
    "In Progress": "border-purple-400 text-purple-700",
    "Waiting Approval": "border-orange-400 text-orange-700",
    Completed: "border-green-400 text-green-700",
    Failed: "border-red-400 text-red-700",
    "On Hold": "border-indigo-400 text-indigo-700",
    Declined: "border-pink-400 text-pink-700",
};

const MyTasks = () => {
    const { tasks, updateTaskStatus } = useContext(TaskContext);
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser)
        return (
            <p className="text-gray-500 text-center mt-10">
                Please login to see tasks.
            </p>
        );

    const userTasks = tasks.filter(
        (task) => task.employeeName === loggedInUser.name
    );

    const employeeActions = ["Accepted", "Declined", "In Progress", "Completed"];

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                My Tasks
            </h2>

            {userTasks.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">
                    No tasks assigned yet.
                </p>
            ) : (
                <ul className="space-y-6">
                    {userTasks.map((task) => (
                        <li
                            key={task.id}
                            className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition hover:-translate-y-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 ${statusColors[task.status]}`}
                        >
                            {/* Task Info */}
                            <div className="flex flex-col flex-1 gap-1">
                                <p className="text-lg font-semibold text-gray-900">{task.title}</p>
                                {task.description && (
                                    <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Due: {task.dueDate || "N/A"}
                                </p>
                                
                            </div>

                            {/* Status Badge */}
                            <span
                                className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap border-2 ${statusColors[task.status]}`}
                            >
                                {task.status || "Not Started"}
                            </span>

                            {/* Action Buttons */}
                            <div className="flex gap-2 flex-wrap mt-3 md:mt-0">
                                {employeeActions.map((action) => (
                                    <button
                                        key={action}
                                        onClick={() => updateTaskStatus(task.id, action)}
                                        className="text-xs px-3 py-1 rounded-full font-medium border border-gray-300 bg-gradient-to-r from-white to-white hover:from-blue-400 hover:to-purple-400 hover:text-white transition shadow-sm"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyTasks;

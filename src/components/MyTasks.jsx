import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

// Colors for simplified statuses
const statusColors = {
    "Pending": { bg: "bg-blue-100", border: "border-blue-500", text: "text-blue-700" },
    "In Progress": { bg: "bg-purple-100", border: "border-purple-500", text: "text-purple-700" },
    "Completed": { bg: "bg-green-100", border: "border-green-500", text: "text-green-700" },
    "Failed": { bg: "bg-pink-100", border: "border-pink-500", text: "text-pink-700" },
};

const MyTasks = () => {
    const { tasks, updateTaskStatus } = useContext(TaskContext);

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return <p className="text-gray-500 text-center mt-10">Please login to see tasks.</p>;

    // Filter tasks for logged-in user
    const userTasks = tasks.filter(task => task.employeeName === user.name);

    // Map original statuses to simplified ones
    const groupedTasks = { "Pending": [], "In Progress": [], "Completed": [], "Failed": [] };

    userTasks.forEach(task => {
        let status = task.status;
        if (status === "Accepted") status = "Pending";
        else if (status === "Declined") status = "Failed";
        else if (!["In Progress", "Completed"].includes(status)) return; // ignore other statuses

        groupedTasks[status].push(task);
    });

    const statuses = ["Pending", "In Progress", "Completed", "Failed"];
    const actions = ["Pending", "In Progress", "Completed", "Failed"];

    return (
        <div className="max-w-full mx-auto p-1 space-y-6">
            <h2 className="text-3xl font-bold mb-4">My Tasks</h2>

            {statuses.map(status => {
                const tasksForStatus = groupedTasks[status];
                if (tasksForStatus.length === 0) return null;

                return (
                    <div key={status} className="space-y-2">
                        {/* Status header */}
                        <div className={`p-4 rounded-xl shadow-md flex justify-between items-center ${statusColors[status].bg} border-l-4 ${statusColors[status].border}`}>
                            <h3 className={`font-semibold ${statusColors[status].text}`}>{status}</h3>
                            <p className={`text-lg font-semibold ${statusColors[status].text}`}>({tasksForStatus.length})</p>
                        </div>

                        {/* Task cards */}
                        {tasksForStatus.map(task => (
                            <div key={task.id} className={`bg-white p-3 rounded-xl shadow-md flex justify-between items-center border-l-4 ${statusColors[status].border}`}>
                                <div>
                                    <p className="font-semibold">{task.title}</p>
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                    <p className="text-xs text-gray-500">Due: {task.dueDate || "N/A"}</p>
                                </div>

                                <div className="flex gap-2">
                                    {actions.map(action => (
                                        <button
                                            key={action}
                                            onClick={() => updateTaskStatus(task.id, action === "Pending" ? "Accepted" : action === "Failed" ? "Declined" : action)}
                                            className="text-xs px-2 py-1 rounded-full border border-gray-300 hover:bg-blue-400 hover:text-white transition"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}

            {userTasks.length === 0 && (
                <p className="text-gray-500 text-center">No tasks assigned yet.</p>
            )}
        </div>
    );
};

export default MyTasks;

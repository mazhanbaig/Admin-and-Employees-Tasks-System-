import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const ProfileCard = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const { tasks } = useContext(TaskContext);

    if (!loggedInUser) return null;

    // Count tasks for this user
    // const userTasks = tasks.filter((task) => task.employeeName === loggedInUser.name);
    // const completedCount = userTasks.filter((t) => t.status === "Completed").length;
    // const pendingCount = userTasks.filter((t) => t.status === "Pending").length;
    // const failedCount = userTasks.filter((t) => t.status === "Failed").length;

    return (
        <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-6 hover:scale-101 transform transition-transform duration-300">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-lg">
                {loggedInUser.name.charAt(0)}
            </div>

            {/* User Info + Stats */}
            <div className="flex-1 flex flex-col md:flex-row md:justify-between gap-4 w-full">
                {/* User Info */}
                <div>
                    <h2 className="text-2xl font-bold">{loggedInUser.name}</h2>
                    <p className="text-sm opacity-80">{loggedInUser.email}</p>
                    <span className="text-xs bg-white text-indigo-600 px-3 py-1 rounded-full font-semibold mt-1 inline-block">
                        {loggedInUser.role}
                    </span>
                </div>

            </div>

            {/* Decorative floating circle */}
            <div className="absolute -top-5 -right-5 w-22 h-22 rounded-full bg-white opacity-20 animate-pulse"></div>
        </div>
    );
};

export default ProfileCard;

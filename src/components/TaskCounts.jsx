import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskCounts = () => {
    const { tasks } = useContext(TaskContext);

    // get logged in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // filter tasks based on role
    const userTasks =
        loggedInUser?.role === "employee"
            ? tasks.filter((task) => task.employeeName === loggedInUser.name)
            : tasks; // admin sees all tasks

    // Count tasks by status
    const totalCount = userTasks.length;
    const completedCount = userTasks.filter((task) => task.status === "Completed").length;
    const failedCount = userTasks.filter((task) => task.status === "Declined").length;
    const pendingCount = userTasks.filter((task) => task.status === "Accepted").length;

    // Example for future expansion (if you track more status fields)
    const inProgressCount = userTasks.filter((task) => task.status === "In Progress").length;

    return (
        <div className="px-4 py-2 sm:px-3 sm:py-1 flex justify-between gap-4 overflow-x-auto no-scrollbar">
            {/* Total Tasks */}
            <div className="min-w-[200px] w-[200px] sm:w-[250px] h-[100px] md:h-auto bg-blue-100 border-l-4 border-blue-500 p-6 rounded-xl shadow-md flex flex-col justify-center items-center flex-shrink-0">
                <h3 className="text-lg font-semibold text-blue-700">Total</h3>
                <p className="text-3xl font-bold text-blue-900">{totalCount}</p>
            </div>

            {/* Completed */}
            <div className="min-w-[200px] w-[200px] h-[100px] md:h-auto sm:w-[250px] bg-green-100 border-l-4 border-green-500 p-6 rounded-xl shadow-md flex flex-col justify-cente items-center flex-shrink-0">
                <h3 className="text-lg font-semibold text-green-700">Completed</h3>
                <p className="text-3xl font-bold text-green-900">{completedCount}</p>
            </div>

            {/* Pending */}
            <div className="min-w-[200px] w-[200px] h-[100px] md:h-auto sm:w-[250px] bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-xl shadow-md flex flex-col justify-cente items-center flex-shrink-0">
                <h3 className="text-lg font-semibold text-yellow-700">Pending</h3>
                <p className="text-3xl font-bold text-yellow-900">{pendingCount}</p>
            </div>

            {/* Failed */}
            <div className="min-w-[200px] w-[200px] h-[100px] md:h-auto sm:w-[250px] bg-red-100 border-l-4 border-red-500 p-6 rounded-xl shadow-md flex flex-col justify-cente items-center flex-shrink-0">
                <h3 className="text-lg font-semibold text-red-700">Failed</h3>
                <p className="text-3xl font-bold text-red-900">{failedCount}</p>
            </div>

            {/* In Progress (optional future section) */}
            <div className="min-w-[200px] w-[200px] sm:w-[250px] bg-purple-100 border-l-4 border-purple-500 p-6 rounded-xl shadow-md flex flex-col justify-center items-center flex-shrink-0">
                <h3 className="text-lg font-semibold text-purple-700">In Progress</h3>
                <p className="text-3xl font-bold text-purple-900">{inProgressCount}</p>
            </div>
        </div>
    );
};

export default TaskCounts;

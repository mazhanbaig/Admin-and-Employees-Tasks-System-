import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import { TaskContext } from "../context/TaskContext";

const AdminPanel = () => {
  const { tasks, deleteTask, expanded, toggleExpand } = useContext(TaskContext);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar with Logout from Context */}
      <Navbar />

      <div className="p-6">
        <TaskForm />

        {/* Assigned Tasks */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Assigned Tasks
          </h3>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => {
                const isLong = task.description.length > 30;
                const displayText =
                  expanded[task.id] || !isLong
                    ? task.description
                    : `${task.description.substring(0, 30)}...`;

                return (
                  <div
                    key={task.id}
                    className="group bg-gradient-to-r from-blue-50 to-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 relative"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-lg font-semibold text-gray-800">
                        {task.employeeName}
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {/* Title */}
                    <p className="text-gray-700 font-medium mb-2">
                      {task.title}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 mb-3 text-sm break-words whitespace-normal">
                      {displayText}
                      {isLong && (
                        <button
                          onClick={() => toggleExpand(task.id)}
                          className="text-blue-500 ml-1 text-xs font-semibold"
                        >
                          {expanded[task.id] ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>

                    {/* Dates */}
                    <div className="text-gray-500 text-xs flex justify-between mb-2">
                      <span>Due: {task.dueDate}</span>
                      <span>Assigned: {task.assignedDate}</span>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="hidden group-hover:inline-block bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow transition"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

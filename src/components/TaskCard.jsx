import React from "react";

const TaskCard = ({ task, idx, onUpdateStatus }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <p className="text-lg font-semibold text-gray-800">{task.title}</p>
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${
            task.status === "active"
              ? "bg-blue-100 text-blue-700"
              : task.status === "completed"
              ? "bg-green-100 text-green-700"
              : task.status === "failed"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 mb-3 text-sm break-words">{task.description}</p>

      <div className="flex justify-between mt-2">
        {task.status !== "completed" && (
          <button
            onClick={() => onUpdateStatus(idx, "completed")}
            className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
          >
            Mark Completed
          </button>
        )}
        {task.status !== "failed" && (
          <button
            onClick={() => onUpdateStatus(idx, "failed")}
            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
          >
            Mark Failed
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { TaskContext } from "../context/TaskContext";

const EmployeePanel = () => {
  const { tasks, expanded, toggleExpand } = useContext(TaskContext);
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [myTasks, setMyTasks] = useState([]);

  // Load logged-in employee email from localStorage
  useEffect(() => {
    const email = localStorage.getItem("loggedInEmail");
    if (email) {
      setEmployeeEmail(email);
    }
  }, []);

  // Filter tasks for this employee
  useEffect(() => {
    if (employeeEmail) {
      const assignedTasks = tasks.filter(
        (task) => task.employeeEmail === employeeEmail // match exact email
      );
      setMyTasks(assignedTasks);
    }
  }, [employeeEmail, tasks]);


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Assigned Tasks
        </h2>

        {myTasks.length === 0 ? (
          <p className="text-gray-500 text-center">
            No tasks assigned to you yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTasks.map((task) => {
              const isLong = task.description.length > 30;
              const displayText =
                expanded[task.id] || !isLong
                  ? task.description
                  : task.description.substring(0, 30) + "...";

              return (
                <div
                  key={task.id}
                  className="bg-gradient-to-r from-green-50 to-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-lg font-semibold text-gray-800">
                      {task.title}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

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

                  <div className="text-gray-500 text-xs flex justify-between">
                    <span>Due: {task.dueDate}</span>
                    <span>Assigned: {task.assignedDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePanel;

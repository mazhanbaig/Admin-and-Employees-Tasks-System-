import React, { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import TaskForm from "../src/components/TaskForm";
import { getTasksFromStorage, setTaskToStorage, setDataToStorage } from "../src/components/localStorage";

const AdminPanel = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    let storedTasks = getTasksFromStorage();
    if (storedTasks.length === 0) {
      setDataToStorage(); // only for default users
    }
    setTasks(storedTasks);
  }, []);

  // Add task
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]); // update state
    setTaskToStorage(newTask);      // update localStorage
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <TaskForm onAddTask={addTask} />

        {/* Assigned Tasks */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Assigned Tasks</h3>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-blue-50 to-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-lg font-semibold text-gray-800">{task.employeeName}</p>
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
                  <p className="text-gray-700 font-medium mb-2">{task.title}</p>
                  <p className="text-gray-600 mb-3 text-sm break-words break-all whitespace-normal">
                    {task.description}
                  </p>

                  <div className="text-gray-500 text-xs flex justify-between">
                    <span>Due: {task.dueDate}</span>
                    <span>Assigned: {task.assignedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

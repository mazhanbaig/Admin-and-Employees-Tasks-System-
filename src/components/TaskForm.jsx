import React, { useState, useEffect, useContext } from "react";
import { getDataFromStorage } from "./localStorage";
// import { TaskProvider } from "../context/TaskContext";
import { TaskContext, TaskProvider } from "../context/TaskContext";


const TaskForm = () => {
  const { addTask } = useContext(TaskContext);

  const [task, setTask] = useState({
    employeeName: "",
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedDate: new Date().toISOString().split("T")[0],
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const users = getDataFromStorage();
    const employeeUsers = users.filter((user) => user.role === "employee");
    setEmployees(employeeUsers);
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({
      employeeName: "",
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="w-full mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Assign New Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start"
      >
        {/* Left Column */}
        <div className="space-y-4">
          {/* Employee Name Select */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Employee Name
            </label>
            <select
              name="employeeName"
              value={task.employeeName}
              onChange={handleChange}
              required
              className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.name}>
                  {emp.name} ({emp.email})
                </option>
              ))}
            </select>
          </div>

          {/* Task Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
              className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
              className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            />
          </div>
        </div>

        {/* Right Column - Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task details"
            className="px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition resize-none h-26 md:h-48"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-4 rounded-2xl font-semibold shadow-lg text-lg transition"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load tasks from localStorage on first render
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [expanded, setExpanded] = useState({});

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (task) => {
    const taskWithId = { ...task, id: Date.now() };
    setTasks((prev) => [...prev, taskWithId]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Update Task Status
  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  // Expand/Collapse
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTaskStatus,
        expanded,
        toggleExpand,
        logout,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

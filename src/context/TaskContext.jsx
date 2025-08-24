import React, { createContext, useState, useEffect } from "react";
import { getTasksFromStorage } from "../components/localStorage";

// Create Context
export const TaskContext = createContext();

// Provider Component
export const TaskProvider = ({ children }) => {
  // ------------------ State ------------------
  const [tasks, setTasks] = useState([]);
  const [expanded, setExpanded] = useState({});

  // ------------------ Effects ------------------
  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // ------------------ Task Functions ------------------
  const addTask = (task) => {
    const taskWithId = { ...task, id: Date.now() };
    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // ✅ keep lowercase "tasks"
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ------------------ Auth Functions ------------------
  const logout = () => {
    // localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("loggedInUser");
    window.location.href = "/Login"; // Redirect
  };

  // ------------------ Provider ------------------
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        expanded,
        toggleExpand,
        logout,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

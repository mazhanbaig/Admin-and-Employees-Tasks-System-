import React, { createContext, useState, useEffect } from "react";
import { getTasksFromStorage, setTaskToStorage } from "../components/localStorage";

// 1. Create the context
export const TaskContext = createContext();

// 2. Create the provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when app starts
  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    setTasks(storedTasks);
  }, []);

  // Add a new task
  const addTask = (newTask) => {
    const taskWithId = { ...newTask, id: Date.now() }; // unique id
    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);
    setTaskToStorage(taskWithId);
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
  };

  // Toggle expanded for a task (can be stored locally in component too)
  const [expanded, setExpanded] = useState({});
  const toggleExpand = (id) => {
    setExpanded({ ...expanded, [id]: !expanded[id] });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, expanded, toggleExpand }}
    >
      {children}
    </TaskContext.Provider>
  );
};

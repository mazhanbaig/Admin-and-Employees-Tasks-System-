// import React, { createContext, useState, useEffect } from "react";
// import { getTasksFromStorage } from "../components/localStorage";
// import { useNavigate } from "react-router-dom";


// // Create Context
// export const TaskContext = createContext();

// // Provider Component
// export const TaskProvider = ({ children }) => {
//   const navigate = useNavigate();
//   // ------------------ State ------------------
//   const [tasks, setTasks] = useState([]);
//   const [expanded, setExpanded] = useState({});

//   // ------------------ Effects ------------------
//   useEffect(() => {
//     const storedTasks = getTasksFromStorage();
//     if (storedTasks) setTasks(storedTasks);
//   }, []);

//   // ------------------ Task Functions ------------------
//   const addTask = (task) => {
//     const taskWithId = { ...task, id: Date.now() };
//     const updatedTasks = [...tasks, taskWithId];
//     setTasks(updatedTasks);
//     localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // ✅ keep lowercase "tasks"
//   };

//   const deleteTask = (id) => {
//     const updatedTasks = tasks.filter((task) => task.id !== id);
//     setTasks(updatedTasks);
//     localStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };

//   const updateTaskStatus = (id, status) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === id ? { ...task, status } : task
//     );
//     setTasks(updatedTasks);
//     localStorage.setItem("tasks", JSON.stringify(updatedTasks));
//   };

//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   // ------------------ Auth Functions ------------------
//   const logout = () => {
//     // localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("loggedInEmail");
//     localStorage.removeItem("loggedInUser");
//     navigate("/login"); // Redirect
//   };

//   // ------------------ Provider ------------------
//   return (
//     <TaskContext.Provider
//       value={{
//         tasks,
//         addTask,
//         deleteTask,
//         updateTaskStatus,
//         expanded,
//         toggleExpand,
//         logout,
//       }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// };





import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create Context
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const navigate = useNavigate();

  // Tasks only in memory (not in localStorage)
  const [tasks, setTasks] = useState([]);
  const [expanded, setExpanded] = useState({});

  // ------------------ Task Functions ------------------
  const addTask = (task) => {
    const newTask = { ...task, id: Date.now() };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ------------------ Auth Functions ------------------
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInEmail");
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

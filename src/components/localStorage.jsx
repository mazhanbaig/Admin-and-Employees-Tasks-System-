import js from "@eslint/js";

// Employees objects
const employees = [
  {
    id: 101,
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "alice123",
    role: "employee",
    tasks: [
      { title: "Prepare monthly report", status: "active" },
      { title: "Update Excel sheets", status: "in-progress" },
    ],
  },
  {
    id: 102,
    name: "Bob Smith",
    email: "bob@example.com",
    password: "bob123",
    role: "employee",
    tasks: [
      { title: "Fix UI bugs", status: "in-progress" },
      { title: "Refactor login page", status: "completed" },
    ],
  },
  {
    id: 103,
    name: "Charlie Brown",
    email: "charlie@example.com",
    password: "charlie123",
    role: "manager",
    tasks: [
      { title: "Deploy new version", status: "failed" },
      { title: "Review code changes", status: "active" },
    ],
  },
  {
    id: 104,
    name: "David Lee",
    email: "david@example.com",
    password: "david123",
    role: "employee",
    tasks: [
      { title: "Update documentation", status: "completed" },
      { title: "Check API response", status: "active" },
    ],
  },
  {
    id: 105,
    name: "Eva Green",
    email: "eva@example.com",
    password: "eva123",
    role: "team-lead",
    tasks: [
      { title: "Test new features", status: "active" },
      { title: "Organize sprint planning", status: "in-progress" },
    ],
  },
];

// Admin object
const admin = {
  id: 1,
  name: "John Admin",
  email: "a@a.com",
  password: "admin123",
  role: "admin",
};

// Merge all users
const users = [admin, ...employees];

// ✅ Get data
export const getDataFromStorage = () => {
  return JSON.parse(localStorage.getItem("usersData") || "[]");
};

// ✅ Save data
export const setDataToStorage = () => {
  localStorage.setItem("usersData", JSON.stringify(users));
};

// Save tasks (add new task without overwriting existing)
export const setTaskToStorage = (newTask) => {
  const tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
  tasks.push(newTask);
  localStorage.setItem("Tasks", JSON.stringify(tasks));
};

// Get tasks
export const getTasksFromStorage = () => {
  return JSON.parse(localStorage.getItem("Tasks") || "[]");
};
// Users
const employees = [
  { id: 101, name: "Alice Johnson", email: "alice@a.com", password: "a", role: "employee" },
  { id: 102, name: "Bob Smith", email: "bob@example.com", password: "bob123", role: "employee" },
  { id: 103, name: "Charlie Brown", email: "charlie@example.com", password: "charlie123", role: "manager" },
  { id: 104, name: "David Lee", email: "david@example.com", password: "david123", role: "employee" },
  { id: 105, name: "Eva Green", email: "eva@example.com", password: "eva123", role: "team-lead" },
];

// Admin
const admin = { id: 1, name: "John Admin", email: "a@a.com", password: "a", role: "admin" };

// Merge all users
const users = [admin, ...employees];

// ✅ Get users
export const getDataFromStorage = () => {
  return JSON.parse(localStorage.getItem("usersData") || "[]");
};

// ✅ Save users
export const setDataToStorage = () => {
  localStorage.setItem("usersData", JSON.stringify(users));
};

// ✅ Get tasks
export const getTasksFromStorage = () => {
  return JSON.parse(localStorage.getItem("Tasks") || "[]");
};

// ✅ Add new task (link to employee)
export const setTaskToStorage = (newTask) => {
  const tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
  tasks.push(newTask);
  localStorage.setItem("Tasks", JSON.stringify(tasks));
};

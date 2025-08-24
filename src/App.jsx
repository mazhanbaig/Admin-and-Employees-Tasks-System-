import React, { useState, useEffect } from "react";
import Login from "./pages/Login.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import EmployeePanel from "./pages/EmployeePanel.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts (auto-login after refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage on login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    localStorage.setItem("loggedInEmail", loggedInUser.email);
  };

  // Routing by role
  if (!user) return <Login onLogin={handleLogin} />;

  if (user.role === "admin") return <AdminPanel />;
  if (user.role === "employee") return <EmployeePanel  />;

  return <p>❌ Unknown role</p>;
};

export default App;

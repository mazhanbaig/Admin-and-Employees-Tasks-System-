import React, { useState, useEffect } from "react";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";
import { getDataFromStorage } from "../src/components/localStorage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check login state on page load
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("currentUserEmail");

    if (loggedIn && email) {
      const user = getDataFromStorage().find(u => u.email === email);
      if (user && user.role === "admin") {
        setCurrentUser(user);
      }
    }

    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (user) => {
    // Only allow admin login
    if (user.role !== "admin") {
      alert("❌ Only admin can log in here");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUserEmail", user.email);
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn || !currentUser) return <Login onLogin={handleLogin} />;

  return <AdminPanel />;
};

export default App;

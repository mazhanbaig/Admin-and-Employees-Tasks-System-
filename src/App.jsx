import React, { useState, useEffect } from "react";
import AdminPanel from "./components/AdminPanel";
import Login from "../pages/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Read login state from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <AdminPanel />
      )}
    </>
  );
};

export default App;

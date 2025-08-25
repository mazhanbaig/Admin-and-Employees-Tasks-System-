// import React, { useState, useEffect } from "react";
// import Login from "./pages/Login.jsx";
// import AdminPanel from "./pages/AdminPanel.jsx";
// import EmployeePanel from "./pages/EmployeePanel.jsx";
// import { Route, Routes, Navigate } from "react-router-dom";

// const App = () => {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage when app starts (auto-login after refresh)
//   useEffect(() => {
//     const storedUser = localStorage.getItem("loggedInUser");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Save user to localStorage on login
//   const handleLogin = (loggedInUser) => {
//     setUser(loggedInUser);
//     localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
//     localStorage.setItem("loggedInEmail", loggedInUser.email);
//   };

//   return (
//     <Routes>
//       {/* If user not logged in → show login */}
//       {!user && <Route path="/login" element={<Login />} />}

//       {/* Admin route */}
//       {user?.role === "admin" && (
//         <Route path="/admin" element={<AdminPanel />} />
//       )}

//       {/* Employee route */}
//       {user?.role === "employee" && (
//         <Route path="/employee" element={<EmployeePanel />} />
//       )}

//       {/* Default redirects after login */}
//       {user?.role === "admin" && (
//         <Route path="*" element={<Navigate to="/admin" replace />} />
//       )}
//       {user?.role === "employee" && (
//         <Route path="*" element={<Navigate to="/employee" replace />} />
//       )}
//     </Routes>
//   );
// };

// export default App;






import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import EmployeePanel from "./pages/EmployeePanel.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage when app starts (auto-login after refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage on login + redirect
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    localStorage.setItem("loggedInEmail", loggedInUser.email);

    // redirect based on role
    if (loggedInUser.role === "admin") {
      navigate("/admin");
    } else if (loggedInUser.role === "employee") {
      navigate("/employee");
    }
  };

  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* Admin page (protected) */}
      <Route
        path="/admin"
        element={
          user?.role === "admin" ? <AdminPanel /> : <Navigate to="/login" />
        }
      />

      {/* Employee page (protected) */}
      <Route
        path="/employee"
        element={
          user?.role === "employee" ? <EmployeePanel /> : <Navigate to="/login" />
        }
      />

      {/* Default route "/" → redirect based on login */}
      <Route
        path="/"
        element={
          !user ? (
            <Navigate to="/login" />
          ) : user.role === "admin" ? (
            <Navigate to="/admin" />
          ) : (
            <Navigate to="/employee" />
          )
        }
      />

      {/* Catch-all (404) */}
      <Route path="*" element={<p>❌ Page not found</p>} />
    </Routes>
  );
};

export default App;

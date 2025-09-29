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
import { TaskProvider } from "./context/TaskContext.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // ✅ parse first
      setUser(parsedUser);
      if (parsedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    }
  }, [navigate]);


  // Handle login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    localStorage.setItem("loggedInEmail", loggedInUser.email);

    if (loggedInUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/employee");
    }
  };

  return (
    <Routes>
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

      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route
        path="/admin"
        element={
          user?.role === "admin" ? <AdminPanel /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/employee"
        element={
          user?.role === "employee" ? <EmployeePanel /> : <Navigate to="/login" />
        }
      />

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

      <Route path="*" element={<p>❌ Page not found</p>} />
    </Routes>
  );
};

export default App;

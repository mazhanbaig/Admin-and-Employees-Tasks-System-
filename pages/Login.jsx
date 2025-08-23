import React, { useState, useEffect } from "react";
import { getDataFromStorage, setDataToStorage } from "../src/components/localStorage";

const Login = ({onLogin}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // 🔹 Seed data only once (if localStorage is empty)
  useEffect(() => {
    const existingData = getDataFromStorage();
    if (existingData.length === 0) {
      setDataToStorage();
    }
  }, []);

  const handleLogin = (e) => {
  e.preventDefault();

  const authData = getDataFromStorage();

  const foundUser = authData.find(
    (user) => user.email === email.trim() && user.password === password.trim()
  );

  if (foundUser) {
    alert(`✅ Welcome ${foundUser.name} (Role: ${foundUser.role})`);

    // ✅ Save login state in localStorage
    localStorage.setItem("isLoggedIn", "true");

    onLogin();
  } else {
    alert("❌ Invalid email or password");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Login to Your Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Welcome back! Please enter your details
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <label className="block">
            <span className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </span>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </span>
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

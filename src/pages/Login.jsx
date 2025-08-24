import React, { useEffect, useState } from "react";
import { getDataFromStorage, setDataToStorage } from "../components/localStorage";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Initialize users in localStorage if empty
    const existingData = getDataFromStorage();
    if (existingData.length === 0) setDataToStorage();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getDataFromStorage();

    const foundUser = users.find(
      (user) =>
        user.email === email.trim() &&
        user.password === password.trim()
    );

    if (foundUser) {
      alert(`✅ Welcome ${foundUser.name} (Role: ${foundUser.role})`);
      onLogin(foundUser); // send user info to App.jsx
    } else {
      alert("❌ Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left image */}
      <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src="https://wallpapers.com/images/featured/space-pictures-mq90a1xsulbki4al.jpg"
          alt="Login Background"
        />
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-gray-100">
        <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 z-10">
          <h2 className="text-3xl font-bold text-emerald-800 text-center mb-2">
            Login
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Enter your email and password to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <label className="block">
              <span className="block text-sm font-medium text-gray-600 mb-1">Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-gray-600 mb-1">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
};

export default Login;

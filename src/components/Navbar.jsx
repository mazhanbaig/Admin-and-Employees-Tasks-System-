import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";  // adjust path if needed
import { getDataFromStorage } from "./localStorage";

const Navbar = () => {
    const { logout } = useContext(TaskContext);
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    return (
        <nav className="bg-white shadow-md px-6 py-2 flex justify-between items-center">
            {/* Logo / Title */}
            <h2 className="text-3xl font-bold text-gray-800 tracking-wide">
                {user.role == "admin" ? "Admin Panel" : "Employee DashBoard" }
                
            </h2>

            {/* Right Side Links */}
            <div className="flex justify-end space-x-6 p-2">
                <button
                    onClick={logout}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md px-6 py-2 flex justify-between items-center">
            {/* Logo / Title */}
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
                Admin Panel
            </h2>

            {/* Right Side Links */}
            <div className="flex justify-end space-x-6 p-2">
                <button
                    onClick={() => {
                        window.location.href = "/login";
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Logout
                </button>
            </div>

        </nav>
    );
};

export default Navbar;

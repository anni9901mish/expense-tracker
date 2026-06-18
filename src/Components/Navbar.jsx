import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <p className="text-sm text-gray-300">Manage your daily expenses</p>
      </div>
    </nav>
  );
};

export default Navbar;
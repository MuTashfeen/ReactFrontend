import React from 'react';
import logo from '../assets/logo.png'; // Make sure to place your logo here or update path

const Navbar = ({ onSignOut }) => {
  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="flex items-center space-x-2">
        {/* Placeholder for your logo */}
        <img src={logo} alt="Smart Career Coach Logo" className="h-8" />
        <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Smart Career Coach</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 hidden md:block">Welcome, User!</span> {/* Replace with actual user name */}
        <button
          onClick={onSignOut}
          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">LuxStay</span>
        </div>
        {/* Navigation */}
        <nav className="flex flex-wrap gap-3 text-gray-700 text-sm font-medium">
          <a href="#" className="hover:text-blue-600">
            Rooms
          </a>
          <a href="#" className="hover:text-blue-600">
            Mansion
          </a>
          <a href="#" className="hover:text-blue-600">
            Countryside
          </a>
          <a href="#" className="hover:text-blue-600">
            Beachfront
          </a>
          <a href="#" className="hover:text-blue-600">
            City Center
          </a>
        </nav>
        {/* Search Bar */}
        <div className="flex-1 flex justify-center md:justify-end">
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Search properties"
          />
        </div>
        {/* Auth Buttons */}
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
            Sign In
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 mt-8 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4 text-gray-600 text-sm">
        <div>&copy; {new Date().getFullYear()} LuxStay. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
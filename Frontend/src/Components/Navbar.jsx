// Navbar.jsx - Updated with professional design
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  let location = useLocation()
  let navigate = useNavigate()

  if(location.pathname === "/login" || location.pathname === "/signup") {
    return null
  }

  function logout() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    }).then(() => {
      navigate("/login")
    })
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/landing" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">NoteApp</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/landing" 
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/landing' 
                  ? 'text-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={`font-medium transition-colors duration-200 ${
                location.pathname === '/create' 
                  ? 'text-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Notes
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
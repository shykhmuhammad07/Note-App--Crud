import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${URL}/auth/check`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.log("Auth check error:", error);
      }
    }

    checkAuth();
  }, [location]);

  // Don't show navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  function logout() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setIsLoggedIn(false);
      navigate("/");
    });
  }

  return (
    <nav className="bg-gray-800/80 backdrop-blur-lg border-b border-purple-500/20 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                NotesApp
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center ${
                location.pathname === "/"
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg"
                  : "text-purple-200 hover:text-white hover:bg-purple-900/30"
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/create"
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center ${
                    location.pathname === "/create"
                      ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg"
                      : "text-purple-200 hover:text-white hover:bg-purple-900/30"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Note
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-lg border border-purple-500/30 text-purple-200 font-medium hover:bg-purple-900/30 transition duration-200 flex items-center backdrop-blur-sm"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/login"
                  className="px-4 py-2 rounded-lg text-purple-200 font-medium hover:text-white hover:bg-purple-900/30 transition duration-200"
                >
                  Sign In
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium hover:from-purple-700 hover:to-violet-700 transition duration-200 shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

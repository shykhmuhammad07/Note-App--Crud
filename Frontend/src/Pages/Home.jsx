import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  let [Note, setNote] = useState([]);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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

        if (data.loggedIn) {
          fetchNotes();
        }
      } catch (error) {
        console.log("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function fetchNotes() {
    try {
      const res = await fetch(`${URL}/notes`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setNote(data.data);
      } else {
        console.log("Fetch Error", data.msg);
      }
    } catch (error) {
      console.log("Fetching Error", error);
    }
  }

  async function deleteNotes(id) {
    try {
      const res = await fetch(`${URL}/notes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setNote(Note.filter((n) => n._id !== id));
        // Refresh notes to get the updated list
        fetchNotes();
      }
    } catch (error) {
      console.log("Error Deleting Note", error);
    }
  }

  // Function to format date properly
  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.log("Date formatting error:", error);
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-purple-200">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900/50 to-violet-900/50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white font-bold text-3xl">N</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to NotesApp
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">
              Your personal space to capture thoughts, ideas, and important
              notes. Everything stays synced across your devices.
            </p>

            {!isLoggedIn ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-violet-700 transition duration-200 shadow-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-8 py-3 border border-purple-500 text-purple-300 font-medium rounded-lg hover:bg-purple-900/30 transition duration-200"
                >
                  Create Account
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/create")}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-violet-700 transition duration-200 shadow-lg flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
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
                  Create New Note
                </button>
                <button
                  onClick={() => navigate("/create")}
                  className="px-8 py-3 border border-purple-500 text-purple-300 font-medium rounded-lg hover:bg-purple-900/30 transition duration-200"
                >
                  Manage All Notes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notes Preview Section - Only show if logged in */}
      {isLoggedIn && (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Your Notes</h2>
              <p className="text-purple-200 text-lg">
                View and manage your notes
              </p>
            </div>

            {Note.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {Note.map((notes) => (
                  <div
                    key={notes._id}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 hover:shadow-purple-500/10 transition duration-200 border border-purple-500/20 group hover:border-purple-500/40 hover:transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <p className="text-purple-100 mb-4 leading-relaxed">
                          {notes.text}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-purple-500/20">
                        <div className="text-sm text-purple-400">
                          {formatDate(notes.createdAt)}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate("/create")}
                            className="px-3 py-2 bg-purple-900/30 text-purple-300 rounded-lg hover:bg-purple-800/50 transition duration-200 flex items-center justify-center text-sm font-medium border border-purple-500/30"
                            title="Edit note"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this note?"
                                )
                              ) {
                                deleteNotes(notes._id);
                              }
                            }}
                            className="px-3 py-2 bg-red-900/30 text-red-300 rounded-lg hover:bg-red-800/50 transition duration-200 flex items-center justify-center text-sm font-medium border border-red-500/30"
                            title="Delete note"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-24 h-24 text-purple-500/40 mx-auto mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    No notes yet
                  </h3>
                  <p className="text-purple-300 text-lg mb-6">
                    Create your first note to get started on your journey!
                  </p>
                  <button
                    onClick={() => navigate("/create")}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-violet-700 transition duration-200 inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
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
                    Create First Note
                  </button>
                </div>
              </div>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-purple-300">Total Notes</p>
                    <p className="text-2xl font-bold text-white">
                      {Note.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-purple-300">Active</p>
                    <p className="text-2xl font-bold text-white">
                      {Note.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-purple-300">Last Activity</p>
                    <p className="text-lg font-bold text-white">
                      {Note.length > 0 ? "Recently" : "Never"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section - Show when not logged in */}
      {!isLoggedIn && (
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose NotesApp?
              </h2>
              <p className="text-purple-200 text-lg">
                Experience the best note-taking platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Easy to Use
                </h3>
                <p className="text-purple-200">
                  Simple and intuitive interface for capturing your thoughts
                  instantly.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Secure & Private
                </h3>
                <p className="text-purple-200">
                  Your notes are encrypted and only accessible by you.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Sync Everywhere
                </h3>
                <p className="text-purple-200">
                  Access your notes from any device, anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

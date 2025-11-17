// Create.jsx - Updated with professional UI
import { useEffect, useState } from "react";

function Create() {
  let [Note, setNote] = useState([]);
  let [text, setText] = useState("");
  let [editId, setEditId] = useState(null);
  let URL = import.meta.env.VITE_BACKEND_URL;

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

  useEffect(() => {
    fetchNotes();
  }, []);

  async function AddNotes() {
    try {
      const res = await fetch(`${URL}/notes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const result = await res.json();

      if (res.ok) {
        setNote([...Note, result.data]);
        setText("");
      }
    } catch (error) {
      console.log("Error Adding Notes", error);
    }
  }

  async function editNotes(id) {
    try {
      const res = await fetch(`${URL}/notes/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const result = await res.json();

      if (res.ok) {
        setNote(
          Note.map((e) =>
            e._id === editId ? { ...e, text: result.data.text } : e
          )
        );
        setText("");
        setEditId(null);
      }
    } catch (error) {
      console.log("Error Editing Note", error);
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
      }
    } catch (error) {
      console.log("Error Deleting Note", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Notes</h1>
          <p className="text-gray-600">Create, edit, and manage your personal notes</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your note here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
            />
            <button 
              onClick={editId ? () => editNotes(editId) : AddNotes}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                editId 
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" 
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              }`}
            >
              {editId ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Note
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Note
                </span>
              )}
            </button>
          </div>
          {editId && (
            <div className="mt-3 text-sm text-purple-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Editing mode active - Click update to save changes
            </div>
          )}
        </div>

        {/* Notes List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {Note.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No notes yet</h3>
              <p className="text-gray-500">Start by creating your first note above!</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {Note.map((notes) => (
                <li key={notes._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-gray-800 text-lg leading-relaxed">{notes.text}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Created: {new Date(notes.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditId(notes._id);
                          setText(notes.text);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteNotes(notes._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Create;
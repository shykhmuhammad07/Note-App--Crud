import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  let [Note, setNote] = useState([]);
  let [text, setText] = useState("");
  let [editId, setEditId] = useState(null);
  const navigate = useNavigate()
  let URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
  async function checkUser() {
    const res = await fetch(`${URL}/auth/check`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json();

    if (!data.loggedIn) {
      navigate("/login");
    }
  }

  checkUser();
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

  useEffect(() => {
    fetchNotes();
  }, []);

  async function AddNotes() {
    if (!text.trim()) return;
    
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
    if (!text.trim()) return;
    
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Notes</h1>
          <p className="text-gray-600">Create and manage your personal notes</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your note here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  editId ? editNotes(editId) : AddNotes();
                }
              }}
            />
            <button 
              onClick={editId ? () => editNotes(editId) : AddNotes}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
            >
              {editId ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Note
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Note
                </>
              )}
            </button>
          </div>
          {editId && (
            <p className="text-sm text-gray-500 mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Editing mode - Click cancel or update to finish
            </p>
          )}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Note.map((notes) => (
            <div 
              key={notes._id} 
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-200 border border-gray-100"
            >
              <div className="flex flex-col h-full">
                <p className="text-gray-800 mb-4 flex-1 leading-relaxed">
                  {notes.text}
                </p>
                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setEditId(notes._id);
                      setText(notes.text);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-200 flex items-center justify-center text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteNotes(notes._id)}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200 flex items-center justify-center text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {Note.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
              <p className="text-gray-500">Create your first note to get started!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;
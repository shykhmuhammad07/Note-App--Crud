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
        setNote([...Note, result.data]); // **Correct**
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
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={editId ? () => editNotes(editId) : AddNotes}>
        {editId ? "Update Note" : "Add Note"}
      </button>

      <div>
        <ul>
          {Note.map((notes) => (
            <li key={notes._id}>
              {notes.text}

              <button
                onClick={() => {
                  setEditId(notes._id);
                  setText(notes.text);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteNotes(notes._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Create;

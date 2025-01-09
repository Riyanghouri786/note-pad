"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

const Notepad = () => {
  const [notes, setNotes] = useState([]); // Store fetched notes
  const [newNote, setNewNote] = useState({ title: "", content: "" }); // State for new note
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true); // Start loading

        const response = await fetch("/api/notes", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        toast.error(error.message || "Failed to load notes.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchNotes();
  }, []);

  // Handle adding a new note
  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error("Both title and content are required.");
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add note");
      }

      const data = await response.json();
      setNotes([data, ...notes]); // Add the new note to the top of the list
      setNewNote({ title: "", content: "" }); // Clear the input fields
      toast.success("Note added!");
    } catch (error) {
      toast.error(error.message || "Failed to add note.");
    }
  };
  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <section className="min-h-screen bg-base-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        My Notepad
      </h1>

      <div className="max-w-3xl mx-auto bg-base-100 shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-base-content mb-4">
          Create a New Note
        </h2>
        <form onSubmit={handleAddNote} className="flex flex-col gap-4">
          <input
            type="text"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="p-3 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter note title"
            required
          />
          <textarea
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            className="p-3 border border-base-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your note here..."
            rows="5"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary text-base-content py-3 rounded-md hover:bg-primary-focus transition font-semibold"
          >
            Add Note
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-base-content mb-4">
          My Notes
        </h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : notes.length === 0 ? (
          <p className="text-center text-base-content">
            No notes available. Start by writing one!
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <li
                key={note._id}
                className="bg-base-100 shadow-md rounded-lg p-5 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-primary">{note.title}</h3>
                <p className="mt-2 text-wrap text-base-content">
                  {/* Truncate content if it exceeds 100 characters */}
                  {truncateContent(note.content, 40)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </section>
  );
};

export default Notepad;

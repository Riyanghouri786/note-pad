"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const [notes, setNotes] = useState([]); // Store fetched notes
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedNote, setSelectedNote] = useState(null); // Store the selected note for the modal

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

  // Open the note in a popup
  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  // Close the modal
  const handleCancel = () => {
    setSelectedNote(null);
  };

  // Delete the selected note
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/notes/${selectedNote._id}`, {
        method: "DELETE",
        credentials: "include", // Ensure cookies are sent
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete note");
      }

      // Remove the deleted note from the state
      setNotes(notes.filter((note) => note._id !== selectedNote._id));
      setSelectedNote(null); // Close the modal
      toast.success("Note deleted!");
    } catch (error) {
      toast.error(error.message || "Failed to delete note.");
    }
  };

  // Helper function to truncate content
  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary sm:text-5xl md:text-6xl lg:text-7xl">
        My Notes
      </h1>

      {/* Display loader while fetching notes */}
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : notes.length === 0 ? (
        <p className="text-center text-base-content">
          No notes available. Start by writing one!
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-base-100 shadow-md rounded-lg p-5 hover:shadow-lg transition cursor-pointer"
              onClick={() => handleNoteClick(note)} // Open note in modal on click
            >
              <h3 className="text-lg font-bold text-primary">{note.title}</h3>
              <p className="mt-2 text-wrap text-base-content">
                {/* Truncate content if it exceeds 100 characters */}
                {truncateContent(note.content, 50)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for viewing and deleting note */}
      {selectedNote && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {selectedNote.title}
            </h2>
            <p className="text-base-content mb-4 break-words">
              {selectedNote.content}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-base-content py-2 px-4 rounded-md hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

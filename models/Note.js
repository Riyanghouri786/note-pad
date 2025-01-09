// models/Note.js
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);

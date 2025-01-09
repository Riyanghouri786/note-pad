import { verify } from "jsonwebtoken";
import dbConnect from "../../../../lib/db";
import Note from "../../../../models/Note";

// Helper function to extract user ID from token
const getUserIdFromToken = (req) => {
  try {
    const token =
      req.headers.get("Authorization")?.split(" ")[1] ||
      require("cookie").parse(req.headers.get("cookie") || "").token;

    if (!token) throw new Error("Token not found");

    const decoded = verify(token, process.env.JWT_SECRET); // Use JWT_SECRET from .env
    return decoded.id;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

// Handle GET request
export async function GET(req) {
  try {
    await dbConnect();

    const userId = getUserIdFromToken(req); // Extract user ID from token

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 401,
    });
  }
}

// Handle POST request
export async function POST(req) {
  try {
    await dbConnect();

    const userId = getUserIdFromToken(req); // Extract user ID from token
    const { title, content } = await req.json(); // Extract note details

    if (!title || !content) {
      return new Response(
        JSON.stringify({ message: "Both title and content are required" }),
        { status: 400 }
      );
    }

    const newNote = new Note({
      user: userId,
      title,
      content,
    });

    await newNote.save();

    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 401,
    });
  }
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Import cookies API
import dbConnect from "../../../../../lib/db";
import User from "../../../../../models/User";

// Secret key for JWT (store this securely)
const JWT_SECRET =
  process.env.JWT_SECRET || "wqwertyuiopsdfghjklwertyusdfghertydfghrtycvbn";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT Token with user data
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Await cookies() before setting the token as an HttpOnly cookie
    const cookieStore = cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600, // 1 hour (seconds)
      path: "/", // Path where the cookie will be available
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

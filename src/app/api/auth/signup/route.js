import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "../../../../../lib/db";
import User from "../../../../../models/User";

export const POST = async (req) => {
  await dbConnect();

  const { name, email, password } = await req.json();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 } // Bad Request
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 } // Created
    );
  } catch (error) {
    console.error("Error during user registration:", error);

    // Return a generic error message without exposing sensitive details
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 } // Internal Server Error
    );
  }
};

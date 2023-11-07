import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { password, confirmPassword } = reqBody;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    const userAmtCode = userExists?.amtCode;

    if (!userExists || userAmtCode !== amtCode) {
      return NextResponse.json(
        {
          error: "Email or Code does not exist",
        },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // send verification email
    await sendEmail(email, "VERIFY", savedUser._id);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

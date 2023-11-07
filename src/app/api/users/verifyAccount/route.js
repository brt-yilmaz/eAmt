import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { amtCode, email } = reqBody;

    // Check if user already exists
    const currentUser = await User.findOne({ email });

    if (!currentUser || currentUser.amtCode !== amtCode) {
      return NextResponse.json(
        {
          error: "Email or Code does not exist",
        },
        { status: 400 }
      );
    }

    if (currentUser.isVerified) {
      return NextResponse.json(
        {
          error: `${email} is already verified. Please login`,
        },
        { status: 400 }
      );
    }

    if (currentUser.verifyTokenExpiry < Date.now()) {
      return NextResponse.json(
        {
          error: "Token expired, please signup again",
        },
        { status: 400 }
      );
    }

    currentUser.isVerified = true;
    currentUser.verifyToken = undefined;
    currentUser.verifyTokenExpiry = undefined;
    const savedUser = await currentUser.save();

    return NextResponse.json({
      message: "User verified successfully",
      success: true,
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

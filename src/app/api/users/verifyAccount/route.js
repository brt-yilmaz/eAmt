import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { amtCode, email } = reqBody;

    if (!email || !amtCode) {
      return NextResponse.json(
        {
          error: "Email or Code is required",
          errorCode: 'AV104', // missing email or amtCode
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const currentUser = await User.findOne({ email });

    if (!currentUser.isEmailVerified) {
      return NextResponse.json(
        {
          error: `${email} is not verified`,
          errorCode: 'AV105',
        },
        { status: 400 }
      );
    }

    if (!currentUser || currentUser.amtCode !== amtCode) {
      return NextResponse.json(
        {
          error: "Email or Code does not exist",
          errorCode: 'AV101', // invalid email or amtCode
        },
        { status: 400 }
      );
    }

    if (currentUser.isAccountVerified) {
      return NextResponse.json(
        {
          error: `This account is already verified`,
          errorCode: 'AV102',
        },
        { status: 400 }
      );
    }

    currentUser.isAccountVerified = true;

    const savedUser = await currentUser.save();

    return NextResponse.json({
      message: "User's Account verified successfully",
      success: true,
      userEmail: savedUser.email,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        errorCode: 'AV103',
      },
      { status: 500 }
    );
  }
}

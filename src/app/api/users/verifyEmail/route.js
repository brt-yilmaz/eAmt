
import { connectDB, disconnectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

connectDB();

export async function POST(req) {

  const reqBody = await req.json();
  const { verifyToken } = reqBody;

  try {

    const user = await User.findOne({ verifyToken });
    if (!user) return NextResponse.json({
      error: 'User not found',
      errorCode: 'AA101' // user not found
    },
      { status: 404 });

    if (user.isEmailVerified) return NextResponse.json({
      error: 'User already verified',
      errorCode: 'AA104' // user already verified
    },
      { status: 404 });

    if (user.verifyToken !== verifyToken) return NextResponse.json({
      error: 'User not found',
      errorCode: 'AA102' // invalid token
    },
      { status: 404 });

    if (user.verifyTokenExpiry < Date.now()) return NextResponse.json({
      error: 'Token expired',
      errorCode: 'AA103' // token expired
    },
      { status: 404 });

    user.isEmailVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: 'Email verified successfully',
      userEmail: user.email
    },
      { status: 200 });


  } catch (error) {

    return NextResponse.json({
      error: error.message,
      errorCode: 'AA104'
    },
      { status: 500 });
  }
}
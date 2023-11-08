// for development

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connectDB();

export async function DELETE(req) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    const user = User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User not found",
      });
    }

    // Check if user already exists
    await User.deleteOne({ email });

    return NextResponse.json({
      message: "User deleted successfully",
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

import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Incorrect password",
        },
        {
          status: 400,
        }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      success: true,
      message: "User logged in successfully",
    });

    // set token to cookie
    res.cookies.set("token", token, {
      httpOnly: true,
    });

    return res;
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}

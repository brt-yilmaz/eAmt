import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
          error: "User or password incorrect",
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
          error: "User or password incorrect",
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
    const passwordToken = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // set token to cookie
    cookies().set({
      name: "passwordToken",
      value: passwordToken,
      httpOnly: true,
      expires: new Date(Date.now() + 3600000 * 24 * 7),
      secure: true,
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

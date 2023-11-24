import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { password, confirmPassword, email } = reqBody;

    // Check if user already exists
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "Email does not exist",
        },
        { status: 400 }
      );
    }

    if (!currentUser.isEmailVerified) {
      return NextResponse.json(
        {
          error: "User not verified, please verify your account",
        },
        { status: 400 }
      );
    }

    if (currentUser.password || currentUser.authToken) {
      return NextResponse.json(
        {
          error:
            "User already created password, please login or reset password",
        },
        { status: 400 }
      );
    }

    /*
      Must be at least 8 characters long.
      Must contain at least one uppercase letter.
      Must contain at least one lowercase letter.
      Must contain at least one digit.
      Must contain at least one special character (@, #, $, %, ^, &, +, =, !).
      Should not include spaces.
      Should not include parentheses or quotation marks (, ), {, }, [, ], <, >).
    */

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?![\s\S]*\s)(?!.*[(){}[\]<>])(?!.*["'])[A-Za-z\d@#$%^&+=!]{8,}$/;

    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error: "Password does not meet requirements",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          error: "Password does not match",
        },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // update User
    currentUser.password = hashedPassword;

    const tokenData = {
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
    };

    const authToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    currentUser.authToken = authToken;

    currentUser.authTokenExpiry = Date.now() + 3600000 * 24 * 7; // 7 days


    cookies().delete("authToken");

    // set token to cookie
    cookies().set({
      name: "authToken",
      value: authToken,
      httpOnly: true,
      expires: new Date(Date.now() + 3600000 * 24 * 7),
      secure: true,
      sameSite: "strict",
    });

    await currentUser.save();


    return NextResponse.json({
      message: "User created successfully",
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

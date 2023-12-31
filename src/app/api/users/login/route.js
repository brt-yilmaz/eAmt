import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import UserLockout from "@/models/userLockoutModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { createToken } from "@/lib/auth";

connectDB();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Check if user is locked out
    const userLockout = await UserLockout.findOne({ email });

    if (userLockout && userLockout.lockedUntil > Date.now()) {
      return NextResponse.json(
        {
          error: "Your account has been locked. Please try again later.",
          errorCode: "AL108",
        },
        {
          status: 400,
        }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "Email or password incorrect",
          errorCode: "AL106",
        },
        {
          status: 400,
        }
      );
    }

    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          error: "Email not verified, please verify your account",
          errorCode: "AL104",
        },
        {
          status: 400,
        }
      );
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      // Record a failed password attempt

      if (!userLockout) {
        const newUserLockout = await UserLockout.create({
          email,
        });

        newUserLockout.failedLoginAttempts += 1;
        await newUserLockout.save();

        return NextResponse.json(
          {
            error: "User or password incorrect",
            errorCode: "AL106",
          },
          {
            status: 400,
          }
        );
      }

      userLockout.failedLoginAttempts += 1;

      if (userLockout.failedLoginAttempts >= 3) {
        userLockout.lockedUntil = Date.now() + 60000; // Lock the account for 1 minute
        await userLockout.save();

        return NextResponse.json(
          {
            error:
              "Your account has been locked for 1 minute. Please try again later.",
            errorCode: "AL108",
          },
          {
            status: 400,
          }
        );
      } else {
        await userLockout.save();
      }

      return NextResponse.json(
        {
          error: "User or password incorrect",
        },
        {
          status: 400,
        }
      );
    }

    if (userLockout && userLockout.lockedUntil > Date.now()) {
      return NextResponse.json(
        {
          error:
            "Your account has been locked for 1 minute. Please try again later.",
        },
        {
          status: 400,
        }
      );
    }

    // Delete user lockout
    await UserLockout.deleteOne({ email });

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const authToken = await createToken(tokenData);

    user.authToken = authToken;
    user.authTokenExpiry = Date.now() + 3600000 * 24 * 7; // 7 days

    cookies().delete("authToken");

    cookies().set({
      name: "authToken",
      value: authToken,
      httpOnly: true,
      expires: new Date(Date.now() + 3600000 * 24 * 7),
      secure: true,
      sameSite: "strict",
    });

    await user.save();
    return NextResponse.json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please send an email to eamt3306@gmail.com",
      },
      { status: 500 }
    );
  }
}

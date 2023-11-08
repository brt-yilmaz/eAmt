import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/email/mailer";
import { amtCodeMaker } from "@/helpers/amtCodeMaker";
import { cookies } from "next/headers";

connectDB();

export async function POST(req) {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE").value;
  try {
    const reqBody = await req.json();
    const { name, email, taxId, zipCode } = reqBody;

    // Check if user already exists
    const currentUser = await User.findOne({ email });

    if (currentUser) {
      if (currentUser.verifyTokenExpiry < Date.now()) {
        //check if verify token is correct
        const hashedToken = await bcryptjs.hash(process.env.JWT_SECRET, 10);
        const validToken = bcryptjs.compare(
          currentUser.verifyToken,
          hashedToken
        );
        if (!validToken) {
          return NextResponse.json(
            {
              error:
                "Provided information is incorrect, Please send us an email",
            },
            { status: 400 }
          );
        }
        await User.findByIdAndUpdate(currentUser._id, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });

        return NextResponse.json({
          message: "verify your account",
          success: true,
        });
      } else {
        return NextResponse.json(
          {
            error: "User already exists",
          },
          { status: 400 }
        );
      }
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      taxId,
      amtCode: amtCodeMaker(),
    });

    const savedUser = await newUser.save();

    // send verification email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
      locale,
    });
    await sendEmail({
      email,
      emailType: "AMTCODE",
      amtCode: savedUser.amtCode,
      taxId: savedUser.taxId,
      name: savedUser.name,
      locale,
    });

    return NextResponse.json({
      message: "verify your account",
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

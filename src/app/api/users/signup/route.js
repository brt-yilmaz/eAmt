import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/email/mailer";
import { amtCodeMaker } from "@/helpers/amtCodeMaker";
import { cookies } from "next/headers";
import { isValidEmail } from "@/helpers/email/isValidEmail";

connectDB();

export async function POST(req) {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE").value;
  try {
    const reqBody = await req.json();
    const { name, email, taxId, zipCode } = reqBody;
    console.log(name, email, taxId, zipCode);
    if (!name || !email || !taxId || !zipCode) {
      return NextResponse.json(
        {
          errorCode: 'AS108' // missing fields
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          errorCode: 'AS102' // invalid email
        },
        { status: 400 }
      );
    }


    if (taxId.length !== 10) {
      return NextResponse.json(
        {
          errorCode: 'AS103' // invalid taxId
        },
        { status: 400 }
      );
    }


    if (zipCode.length !== 5) {
      return NextResponse.json(
        {
          errorCode: 'AS104' // invalid zipCode
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const currentUser = await User.findOne({ email });

    if (currentUser) {
      //check if verify token has expired
      if (currentUser.verifyTokenExpiry < Date.now()) {
        //check if verify token is correct
        const hashedToken = await bcryptjs.hash(process.env.JWT_SECRET_KEY, 10);
        const validToken = bcryptjs.compare(
          currentUser.verifyToken,
          hashedToken
        );
        if (!validToken) {
          return NextResponse.json(
            {
              errorCode: 'AS106' // invalid verifyToken

            },
            { status: 400 }
          );
        }
        await User.findByIdAndUpdate(currentUser._id, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        });

        return NextResponse.json({
          message: "verify your account",
          success: true,
        });
      } else {
        return NextResponse.json(
          {
            errorCode: 'AS107' // user already exists
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
      zipCode,
      amtCode: amtCodeMaker(),
    });

    const savedUser = await newUser.save();

    // send verification email
    try {
      await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
        locale,
      });
    } catch (error) {
      return NextResponse.json(
        {
          errorCode: 'AS109' // verification email not sent
        },
        { status: 500 }
      );
    }

    try {
      await sendEmail({
        email,
        emailType: "AMTCODE",
        amtCode: savedUser.amtCode,
        taxId: savedUser.taxId,
        name: savedUser.name,
        locale,
      });
    } catch (error) {
      return NextResponse.json(
        {
          errorCode: 'AS110' // Email not sent
        },
        { status: 500 }
      );
    }


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

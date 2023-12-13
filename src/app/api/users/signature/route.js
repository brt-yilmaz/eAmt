import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function POST(req) {
  const cookieStore = cookies();

  const decoded = getDataFromToken(req);

  if (!decoded) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }


  const currentUser = await User.findOne({ email: decoded.email }).select(
    "-password"
  );

  if (!currentUser) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }


  if (currentUser.authToken !== cookieStore.get("authToken").value) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const reqBody = await req.json();
  const { signatureImage } = reqBody;

  currentUser.signature = signatureImage;
  await currentUser.save();

  return NextResponse.json(
    {
      message: "Image uploaded successfully",
    },
    {
      status: 200,
    }
  )

}
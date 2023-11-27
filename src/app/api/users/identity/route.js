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
  const { surname, nameOfBirth, firstName, nationality, dateOfBirth, placeOfBirth } = reqBody;

  if (!surname || !nameOfBirth || !firstName || !nationality || !dateOfBirth || !placeOfBirth) {
    return NextResponse.json(
      {
        error: "All fields are required",
        errorCode: "All fields are required",
      },
      {
        status: 400,
      }
    );
  }

  currentUser.documents.push({
    type: "identity",
    surname,
    nameOfBirth,
    firstName,
    nationality,
    dateOfBirth,
    placeOfBirth,
  });
  await currentUser.save();

  return NextResponse.json(
    {
      message: "Application submitted successfully",
    }
  )

}
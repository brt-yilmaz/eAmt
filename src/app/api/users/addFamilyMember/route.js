import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function PATCH(req) {
  const cookieStore = cookies();




  const currentUser = await User.findOne({ email: decoded.email }).select(
    "-password"
  );

  try {

    const reqBody = await req.json();
    const { familyMemberId } = reqBody;

    const newFamilyMember = await User.findById(familyMemberId);
    if (!newFamilyMember) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }


  }







  

}
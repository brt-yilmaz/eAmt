import { NextResponse } from "next/server";

// implement logut
export async function GET() {
  try {
    const res = NextResponse.json({
      success: true,
      message: "User logged out successfully",
    });

    // you can delete toke also but this way is more secure
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}

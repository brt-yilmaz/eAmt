import { NextResponse } from "next/server";

export async function signature(signatureImage) {
  try {
    const response = await fetch(`/api/users/signature`, {
      method: "POST",
      body: JSON.stringify({ signatureImage }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: responseData.message,
          errorCode: responseData.errorCode || 'S101'
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      responseData,
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }

}
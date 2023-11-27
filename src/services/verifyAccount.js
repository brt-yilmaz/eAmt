import { NextResponse } from "next/server";

export async function verifyAccount(data) {

  try {
    const response = await fetch('/api/users/verifyAccount', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: responseData.message,
          errorCode: responseData.errorCode || 'AV103'
        },
        {
          status: 500,
        }
      );
    }


    return NextResponse.json(
      responseData
    );



  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        errorCode: 'AS103'
      })
  }
}
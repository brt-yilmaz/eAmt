import { NextResponse } from "next/server";

export async function createPassword(data) {

  try {
    const response = await fetch('/api/users/createPassword', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: responseData.message,
          errorCode: responseData.errorCode || 'ACP201'
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
        errorCode: 'ACP201'
      })
  }
}
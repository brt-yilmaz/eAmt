import { NextResponse } from "next/server";

export async function login(data) {

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: responseData.message,
          errorCode: responseData.errorCode || 'AL107'
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
        errorCode: 'AL107'
      })
  }

}
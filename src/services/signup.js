import { NextResponse } from "next/server";

export async function signup(data) {

  try {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.message,
          errorCode: errorData.errorCode || 'AS105'
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
      },
      {
        status: 200,
      }
    );


  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        errorCode: 'AS105'

      },
      {
        status: 500,
      }
    );
  }
}
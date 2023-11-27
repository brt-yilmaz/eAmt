import { NextResponse } from "next/server";

export async function identity(data) {

  try {
    const response = await fetch('/api/users/identity', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.message,
          errorCode: errorData.errorCode || 'Something went wrong'
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        message: 'Your application is being processed.',
      },
      {
        status: 200,
      }
    );


  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        errorCode: 'Something went wrong'

      },
      {
        status: 500,
      }
    );
  }
}
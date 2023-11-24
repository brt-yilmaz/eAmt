import { NextResponse } from "next/server";

export async function verifyAccount(data) {

  try {
    const response = await fetch('/api/users/verifyAccount', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.message,
          errorCode: errorData.errorCode || 'AS103'
        })
    }

    return NextResponse.json(
      {
        message: 'Account verified successfully',
      })


  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        errorCode: error.errorCode || 'AS103'
      })
  }
}
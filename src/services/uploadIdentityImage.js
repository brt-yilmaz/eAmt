export async function uploadIdentityImage(imageUrl) {
  try {
    await fetch(`/api/users/documents/identity`, {
      method: "POST",
      body: JSON.stringify({ imageUrl }),
    });

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
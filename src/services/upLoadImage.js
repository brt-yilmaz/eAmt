export async function upLoadImage(imageUrl) {
  try {
    await fetch(`/api/users/uploadImage`, {
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
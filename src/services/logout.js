export async function logout() {
  try {
    await fetch(`/api/users/logout`);

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
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request) {
  // Three steps to compose with other middlewares
  // Step 1: Use the incoming request
  const defaultLocale = "de";

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "de"],
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);

  const path = request.nextUrl.pathname;

  const isAuthPage =
    path === "/login" || path === "/signup" || path === "/verifyAccount";

  const isPublicPath = path === "/dashboard";

  const token = request.cookies.get("token")?.value || "";

  if (!isAuthPage) {
    if (path === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

    if (path === "/en") {
      return NextResponse.redirect(new URL("/en/dashboard", request.nextUrl));
    }
  }

  if ((isPublicPath || isAuthPage) && token) {
    return NextResponse.redirect(
      new URL("/dashboard/profile", request.nextUrl)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyAccount",
  ],
};

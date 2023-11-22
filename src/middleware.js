import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, pathnames } from "./navigation";
import { cookies } from "next/headers";
import { getDataFromToken } from "./helpers/getDataFromToken";
import { connectDB } from "./dbConfig/dbConfig";
import jwt from "jsonwebtoken";

export default async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes("/api/")
  ) {
    return;
  }

  // Three steps to compose with other middlewares
  // Step 1: Use the incoming request
  const defaultLocale = "de";

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    pathnames,
  });

  const response = handleI18nRouting(request);

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);

  // ------------------------  Protected Routes ----------------------------------------------

  if (request.nextUrl.pathname.includes("/profile")) {

    const cookiesStore = cookies();
    const authToken = cookiesStore.get("authToken")?.value;
    console.log(' authToken: ', authToken)

    if (!request.cookies.get("authToken")) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    const currentUser = await User.findOne({ email: decoded.email }).select(
      "-password"
    );

    if (!currentUser) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    if (!currentUser.isVerified) {
      return NextResponse.redirect(new URL("/verifyAccount", request.nextUrl));
    }

    if (currentUser.authToken !== authToken) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

  }


  // Redirect to public dashboard
  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

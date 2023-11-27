import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, pathnames } from "./navigation";
import { cookies } from "next/headers";
import { verifyAuth } from "./lib/auth";

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
  const protectedRoutes = ["/profile"];
  const authRoutes = ["/signup", "/login", '/verifyAccount', '/forgotPassword', '/resetPassword'];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.includes(route)
  );

  const isAuth = authRoutes.some((route) =>
    request.nextUrl.pathname.includes(route)
  );

  if (isProtected || isAuth) {
    const cookiesStore = cookies();
    const authToken = cookiesStore.get("authToken")?.value;
    const verifiedToken = await verifyAuth(authToken).catch((error) => {
      return !NextResponse.redirect(new URL("/dashboard/login", request.nextUrl));
    });
    // const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY) (not working with edge functions);

    if (isProtected) {
      if (!request.cookies.get("authToken")) {
        return NextResponse.redirect(new URL("/dashboard/login", request.nextUrl));
      }
      if (!verifiedToken) {
        return NextResponse.redirect(new URL("/dashboard/login", request.nextUrl));
      }
    }

    if (isAuth) {

      if (verifiedToken) {
        return NextResponse.redirect(new URL("/dashboard/profile", request.nextUrl));
      }


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

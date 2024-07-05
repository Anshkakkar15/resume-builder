import { NextResponse } from "next/server";
import { AUTH_ID_KEY } from "./constants";

export function middleware(request) {
  let token = request.cookies.get(AUTH_ID_KEY);
  const url = request.nextUrl;
  console.log(token);
  if (
    token &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && url.pathname.includes("/builder")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/builder/:path*"],
};

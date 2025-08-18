import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("session-token")?.value;

  // Eğer token yoksa ve giriş yapılmamışsa login sayfasına yönlendir
  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Eger token varsa ve register sayfasına giderse register sayfasına yonlendir
  if (token && request.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Eger token varsa ve login sayfasına giderse login sayfasına yonlendir
  if (token && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

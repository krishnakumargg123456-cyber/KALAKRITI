import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/about",
  "/our-story",
  "/authenticity",
  "/categories",
  "/products",
  "/product",
  "/shop",
  "/search",
  "/artisans",
  "/craft-heritage",
  "/learn",
  "/stories",
  "/traditions",
  "/states",
  "/blog",
  "/faq",
  "/contact",
  "/returns",
  "/shipping",
  "/corporate-gifting",
  "/custom-orders",
  "/auth/login",
  "/auth/register",
];

const PROTECTED_PATHS = [
  "/account",
  "/checkout",
  "/orders",
  "/admin",
  "/artisan",
];

function matchesPath(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some((path) =>
    matchesPath(pathname, path)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    matchesPath(pathname, path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const session = request.cookies.get("kalakriti_session")?.value;

  if (session !== "authenticated") {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};

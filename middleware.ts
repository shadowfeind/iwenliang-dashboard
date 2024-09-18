import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./config/constant/routes";

export async function middleware(request: NextRequest) {
  // NOTE: auth just dont work in middleware.
  // TODO: will check it out or use authjs and dump lucia

  //   const { session } = await auth();

  //   const path = request.nextUrl.pathname;

  //   if (session) {
  //     if (PUBLIC_ROUTES.some((route) => path.startsWith(route))) {
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     }
  //   } else {
  //     if (PRIVATE_ROUTES.some((route) => path.startsWith(route))) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

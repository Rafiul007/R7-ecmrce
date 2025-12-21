import { NextRequest, NextResponse } from "next/server";

type MiddlewareGuard = (
  request: NextRequest
) => NextResponse | null | Promise<NextResponse | null>;

export const middleware = async (request: NextRequest) => {
  console.log("🔥 MIDDLEWARE TRIGGERED FOR:", request.nextUrl.pathname);

  const guards: MiddlewareGuard[] = [blockAuthPagesForLoggedInUsers];

  for (const guard of guards) {
    console.log("🛡️ Running guard...");
    const result = await guard(request);
    if (result) {
      console.log("✅ Guard returned redirect");
      return result;
    }
  }

  console.log("⏭️ No guards triggered, continuing...");
  return NextResponse.next();
};

/**
 * Middleware matcher
 * Only run middleware where it is needed.
 */
export const config = {
  matcher: [
    "/login",
    "/signup",
    // When you add more guards, update this:
    // "/checkout/:path*",
    // "/admin/:path*",
  ],
};

/* ======================================================
   Constants & Configuration
   ====================================================== */

const AUTH_PAGES = ["/login", "/signup"] as const;
const AUTH_COOKIE_NAME = "auth-token";
const DEFAULT_REDIRECT = "/";

/* ======================================================
   Helper Functions
   ====================================================== */

/**
 * Check if user is authenticated
 * Centralized logic for easy testing and reuse
 */
const isAuthenticated = (request: NextRequest): boolean => {
  return Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
};

/**
 * Check if the current path is an auth page
 */
const isAuthPage = (pathname: string): boolean => {
  return AUTH_PAGES.some((page) => pathname === page);
};

/**
 * Create a redirect response
 * Helper to reduce boilerplate
 */
const redirect = (request: NextRequest, path: string): NextResponse => {
  return NextResponse.redirect(new URL(path, request.url));
};

/* ======================================================
   Guards (small, composable, testable functions)
   ====================================================== */

/**
 * Prevent logged-in users from accessing login/signup pages
 */
const blockAuthPagesForLoggedInUsers = (
  request: NextRequest
): NextResponse | null => {
  const { pathname } = request.nextUrl;
  console.log("Middleware running: blockAuthPagesForLoggedInUsers");
  if (isAuthenticated(request) && isAuthPage(pathname)) {
    return redirect(request, DEFAULT_REDIRECT);
  }

  return null;
};

/* ======================================================
   Example: Additional Guards
   ====================================================== */

/**
 * Protect routes that require authentication
 * Uncomment and add to guards array when needed
 */
// const protectAuthenticatedRoutes = (
//   request: NextRequest
// ): NextResponse | null => {
//   const { pathname } = request.nextUrl;
//   const protectedRoutes = ["/dashboard", "/profile", "/settings"];

//   const isProtectedRoute = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isProtectedRoute && !isAuthenticated(request)) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("redirect", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return null;
// };

/**
 * Role-based access control
 * Example of an async guard
 */
// const protectAdminRoutes = async (
//   request: NextRequest
// ): Promise<NextResponse | null> => {
//   const { pathname } = request.nextUrl;

//   if (!pathname.startsWith("/admin")) return null;

//   const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

//   if (!token) {
//     return redirect(request, "/login");
//   }

//   try {
//     // Example: verify JWT and check role
//     const payload = await verifyToken(token);

//     if (payload.role !== "admin") {
//       return redirect(request, "/unauthorized");
//     }
//   } catch (error) {
//     return redirect(request, "/login");
//   }

//   return null;
// };

/**
 * Maintenance mode
 */
// const maintenanceMode = (request: NextRequest): NextResponse | null => {
//   const { pathname } = request.nextUrl;
//   const isMaintenanceEnabled = process.env.MAINTENANCE_MODE === "true";
//   const isMaintenancePage = pathname === "/maintenance";

//   if (isMaintenanceEnabled && !isMaintenancePage) {
//     return NextResponse.rewrite(new URL("/maintenance", request.url));
//   }

//   return null;
// };

/**
 * Rate limiting guard
 */
// const rateLimitGuard = async (
//   request: NextRequest
// ): Promise<NextResponse | null> => {
//   const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
//   const { pathname } = request.nextUrl;

//   // Only rate limit API routes
//   if (!pathname.startsWith("/api")) return null;

//   // Example: check rate limit (you'd implement this with Redis or similar)
//   const isRateLimited = await checkRateLimit(ip);

//   if (isRateLimited) {
//     return new NextResponse("Too Many Requests", { status: 429 });
//   }

//   return null;
// };

/**
 * A/B Testing guard
 */
// const abTestingGuard = (request: NextRequest): NextResponse | null => {
//   const { pathname } = request.nextUrl;

//   if (pathname !== "/pricing") return null;

//   const variant = request.cookies.get("pricing-variant");

//   if (!variant) {
//     const response = NextResponse.next();
//     const newVariant = Math.random() > 0.5 ? "A" : "B";

//     response.cookies.set("pricing-variant", newVariant, {
//       maxAge: 60 * 60 * 24 * 30, // 30 days
//     });

//     return NextResponse.rewrite(
//       new URL(`/pricing-${newVariant.toLowerCase()}`, request.url)
//     );
//   }

//   return null;
// };

/**
 * Locale detection and redirect
 */
// const localeGuard = (request: NextRequest): NextResponse | null => {
//   const { pathname } = request.nextUrl;
//   const locales = ["en", "fr", "es", "de"];

//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (pathnameHasLocale) return null;

//   let locale = request.cookies.get("locale")?.value;

//   if (!locale) {
//     const acceptLanguage = request.headers.get("Accept-Language") || "";
//     locale = acceptLanguage.split(",")[0].split("-")[0];
//   }

//   if (!locales.includes(locale)) {
//     locale = "en";
//   }

//   request.nextUrl.pathname = `/${locale}${pathname}`;
//   return NextResponse.redirect(request.nextUrl);
// };

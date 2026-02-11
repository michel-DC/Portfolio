import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SOURCE_MAP: Record<string, string> = {
  "/li": "LinkedIn",
  "/gh": "GitHub",
  "/in": "Indeed",
  "/sh": "Share",
  "/cv": "CV",
};

const COOKIE_NAME = "visitor_source";
const DEFAULT_SOURCE = "Google/Direct";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 jours

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // 1. Gestion de la session de tracking (anti-doublon au reload)
  const hasLoggedCookie = request.cookies.get("has_logged_visit");
  if (!hasLoggedCookie) {
    requestHeaders.set("x-should-track", "true");
  }

  // 2. Protection du Dashboard
  if (pathname.startsWith("/dashboard")) {
    const isAdmin = request.cookies.get("admin_session")?.value === "true";
    if (!isAdmin && pathname !== "/dashboard/login") {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  // 3. Détection des slugs de tracking
  let response: NextResponse;
  if (SOURCE_MAP[pathname]) {
    const source = SOURCE_MAP[pathname];
    // On redirige vers l'accueil en injectant la source via cookie
    response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set(COOKIE_NAME, source, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    });
    // On ne pose PAS has_logged_visit ici pour que la cible du redirect puisse tracker
    return response;
  }

  // 4. Trafic normal
  response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Initialisation du cookie de session uniquement sur les pages réelles
  if (!hasLoggedCookie) {
    response.cookies.set("has_logged_visit", "true", {
      path: "/",
      sameSite: "lax",
    });
  }

  // 5. Gérer le trafic direct sur la racine (seulement si pas de source existante)
  if (pathname === "/") {
    const existingSource = request.cookies.get(COOKIE_NAME);

    if (!existingSource?.value) {
      response.cookies.set(COOKIE_NAME, DEFAULT_SOURCE, {
        maxAge: COOKIE_MAX_AGE,
        path: "/",
        httpOnly: false,
        sameSite: "lax",
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|video|fonts|documents).*)",
  ],
};

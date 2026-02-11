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

const BOT_UA_REGEX =
  /bot|crawler|spider|crawling|lighthouse|googlebot|bingbot|yandexbot|baiduspider|slurp|duckduckbot|ia_archiver|twitterbot|facebookexternalhit|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|developers\.google\.com\/\+\/web\/snippet|slackbot|vkShare|W3C_Validator|redditbot|Applebot|WhatsApp|flipboard|tumblr|bitlybot|SkypeShell|ShortLinkTranslate|Screaming Frog SEO Spider|Google-PageRenderer|Google-InspectionTool/i;

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";
  const isBot = BOT_UA_REGEX.test(userAgent);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const hasLoggedCookie = request.cookies.get("has_logged_visit");
  if (!hasLoggedCookie && !isBot) {
    requestHeaders.set("x-should-track", "true");
  }

  // Protection du Dashboard
  if (pathname.startsWith("/dashboard")) {
    const isAdmin = request.cookies.get("admin_session")?.value === "true";
    if (!isAdmin && pathname !== "/dashboard/login") {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  // Détection des slugs de tracking
  let response: NextResponse;
  if (SOURCE_MAP[pathname]) {
    const source = SOURCE_MAP[pathname];
    response = NextResponse.redirect(new URL("/", request.url));
    if (!isBot) {
      response.cookies.set(COOKIE_NAME, source, {
        maxAge: COOKIE_MAX_AGE,
        path: "/",
        httpOnly: false,
        sameSite: "lax",
      });
    }
    return response;
  }

  // Trafic normal
  response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Initialisation du cookie de session uniquement sur les pages réelles
  if (!hasLoggedCookie && !isBot) {
    response.cookies.set("has_logged_visit", "true", {
      path: "/",
      sameSite: "lax",
    });
  }

  // Gérer le trafic direct sur la racine (seulement si pas de source existante)
  if (pathname === "/" && !isBot) {
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

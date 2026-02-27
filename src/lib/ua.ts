export interface VisitorInfo {
  browser: string;
  os: string;
  device: string;
}

export function parseUserAgent(ua: string): VisitorInfo {
  const info: VisitorInfo = {
    browser: "Unknown",
    os: "Unknown",
    device: "Desktop",
  };

  if (!ua) return info;

  // Browser detection
  if (ua.includes("Firefox/")) info.browser = "Firefox";
  else if (ua.includes("Edg/")) info.browser = "Edge";
  else if (ua.includes("Chrome/")) info.browser = "Chrome";
  else if (ua.includes("Safari/")) info.browser = "Safari";
  else if (ua.includes("MSIE") || ua.includes("Trident/")) info.browser = "IE";

  // OS detection
  if (ua.includes("Windows")) info.os = "Windows";
  else if (ua.includes("Mac OS X")) info.os = "macOS";
  else if (ua.includes("Android")) info.os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) info.os = "iOS";
  else if (ua.includes("Linux")) info.os = "Linux";

  // Device detection
  if (/Mobi|Android|iPhone|iPad|Tablet/i.test(ua)) {
    info.device = "Mobile";
  }

  return info;
}

export function isHuman(info: VisitorInfo): boolean {
  return (
    info.browser !== "Unknown" &&
    info.os !== "Unknown" &&
    info.device !== "Unknown"
  );
}

const VALID_ROUTES = [
  "/",
  "/a-propos",
  "/mes-projets",
  "/politique-de-confidentialite",
  "/mentions-legales",
  "/dashboard",
  "/dashboard/login",
  "/documents/MICHEL-DJOUMESSI-ALTERNANCE.pdf",
  "/li",
  "/gh",
  "/in",
  "/sh",
  "/cv",
];

export function isValidPath(pathname: string): boolean {
  // Vérifie si c'est une route statique exacte
  if (VALID_ROUTES.includes(pathname)) return true;

  // Vérifie les routes dynamiques (ex: /mes-projets/[slug])
  if (pathname.startsWith("/mes-projets/")) return true;

  return false;
}

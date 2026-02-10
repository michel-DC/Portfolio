import { headers, cookies } from "next/headers";
import { prisma } from "./prisma";

interface VisitorInfo {
  browser: string;
  os: string;
  device: string;
}

function parseUserAgent(ua: string): VisitorInfo {
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

export async function trackVisit(): Promise<void> {
  const headerList = await headers();
  const shouldTrack = headerList.get("x-should-track") === "true";

  if (!shouldTrack) {
    return;
  }

  console.log("📊 Tracking new visit...");
  const cookieStore = await cookies();
  const ua = headerList.get("user-agent") || "";
  const source = cookieStore.get("visitor_source")?.value || "Google/Direct";
  const path = headerList.get("x-pathname") || "/";
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || null;

  const { browser, os, device } = parseUserAgent(ua);

  try {
    await prisma.visit.create({
      data: {
        source,
        path,
        browser,
        os,
        device,
        ip,
      },
    });
  } catch (error) {
    console.error("Failed to track visit:", error);
  }
}

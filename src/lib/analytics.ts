import { headers, cookies } from "next/headers";
import { prisma } from "./prisma";
import { parseUserAgent, isHuman } from "./ua";

export async function trackVisit(): Promise<void> {
  const headerList = await headers();
  const shouldTrack = headerList.get("x-should-track") === "true";

  if (!shouldTrack) {
    return;
  }

  const ua = headerList.get("user-agent") || "";
  const info = parseUserAgent(ua);

  if (!isHuman(info)) {
    return;
  }

  console.log("📊 Tracking new visit...");
  const cookieStore = await cookies();
  const source = cookieStore.get("visitor_source")?.value || "Google/Direct";
  const path = headerList.get("x-pathname") || "/";
  const ip = headerList.get("x-forwarded-for")?.split(",")[0] || null;

  try {
    await prisma.visit.create({
      data: {
        source,
        path,
        browser: info.browser,
        os: info.os,
        device: info.device,
        ip,
      },
    });
  } catch (error) {
    console.error("Failed to track visit:", error);
  }
}

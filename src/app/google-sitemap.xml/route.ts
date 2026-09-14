import { SITE_URL } from "@/lib/site";

export function GET(): Response {
  return Response.redirect(`${SITE_URL}/sitemap.xml`, 301);
}

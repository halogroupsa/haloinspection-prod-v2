import type { MetadataRoute } from "next";
import { IS_PRODUCTION_SITE, SITE_URL } from "@/lib/deployment";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Allow crawling so preview crawlers can see the noindex metadata/header.
  if (!IS_PRODUCTION_SITE) return { rules: { userAgent: "*", allow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

import type { MetadataRoute } from "next";
import { allPaths, SITE_URL } from "@/lib/content";
import { IS_PRODUCTION_SITE } from "@/lib/deployment";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!IS_PRODUCTION_SITE) return [];
  return allPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(
      path === "/" || path === "/inspection-tools"
        ? "2026-10-13T00:00:00.000Z"
        : "2026-10-12T00:00:00.000Z",
    ),
    changeFrequency:
      path.includes("policy") || path.includes("terms")
        ? "yearly"
        : path.includes("services") ||
            path.includes("locations") ||
            path === "/"
          ? "weekly"
          : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/services" ||
            path === "/quote" ||
            ["/services/handover", "/services/pre-purchase"].includes(path)
          ? 0.9
          : path.includes("policy") || path.includes("terms")
            ? 0.3
            : 0.7,
  }));
}

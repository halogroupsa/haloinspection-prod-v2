import assert from "node:assert/strict";
import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd(), false);
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://haloinspection.ae").origin;
const production = origin === "https://haloinspection.ae" && process.env.NEXT_PUBLIC_NOINDEX !== "true" && process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

// Independent inventory of the public routes.
const expected = [
  "/",
  "/services",
  "/quote",
  "/contact",
  "/about",
  "/faq",
  "/blog",
  "/blog/villa-viewing-checklist-dubai",
  "/blog/property-snagging-before-handover-dubai",
  "/privacy-policy",
  "/terms-of-service",
  "/services/pre-purchase",
  "/services/handover",
  "/services/pre-listing",
  "/services/residential/handover",
  "/services/apartment",
  "/services/villa",
  "/services/residential/dlp-inspection",
  "/services/residential/energy-efficiency",
  "/services/residential/post-renovation",
  "/services/residential/pre-listing",
  "/services/residential/pre-move-in",
  "/services/residential/pre-purchase",
  "/services/secondary-inspection",
  "/services/residential/snagging-defect",
  "/services/commercial/commercial-inspection",
  "/services/hotel",
  "/services/developer",
  "/services/commercial/maintenance",
  "/locations",
  ...[
    "dubai-marina",
    "downtown-dubai",
    "palm-jumeirah",
    "business-bay",
    "jbr",
    "emirates-hills",
    "jumeirah",
    "arabian-ranches",
    "dubai-hills",
    "jlt",
    "the-meadows",
    "the-springs",
    "abu-dhabi",
    "sharjah",
    "ajman",
    "fujairah",
    "ras-al-khaimah",
    "umm-al-quwain",
  ].map((p) => "/locations/" + p),
  "/partnerships/developers",
  "/partnerships/property-managers",
  "/partnerships/real-estate-agents",
  "/company/certifications",
  "/inspection-tools",
  "/projects",
  ...["palm-jumeirah", "jumeirah-new", "mbr", "nad-al-sheba-191", "mudon", "nas-gardens-188", "d16", "nad-al-sheba-april", "nas-gardens-186", "dh139"].map((p) => "/projects/" + p + "-dubai"),
];
const root = resolve("out");
const titleSet = new Set();
const descriptionSet = new Set();
const h1Set = new Set();
const links = new Set();
const assets = new Set();
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
const sitemapURLs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => m[1],
);
assert.equal(expected.length, 64);
assert.equal(sitemapURLs.length, production ? expected.length : 0);
for (const path of expected) {
  const html = await readFile(
    resolve(root, path === "/" ? "index.html" : "." + path + ".html"),
    "utf8",
  );
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one H1`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(
    /<meta name="description" content="([^"]+)"/,
  )?.[1];
  const h1 = html
    .match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]
    .replace(/<[^>]*>/g, "");
  assert.ok(title && title.length > 15, `${path}: descriptive title`);
  assert.ok(!titleSet.has(title), `${path}: unique title`);
  titleSet.add(title);
  assert.ok(
    description && description.length > 70,
    `${path}: descriptive meta`,
  );
  assert.ok(!descriptionSet.has(description), `${path}: unique description`);
  descriptionSet.add(description);
  assert.ok(h1, `${path}: static heading`);
  assert.ok(!h1Set.has(h1), `${path}: unique heading`);
  h1Set.add(h1);
  const canonical = `${origin}${path}`;
  assert.ok(
    html.includes(`<link rel="canonical" href="${canonical}"`) ||
      (path === "/" &&
        html.includes(
          `<link rel="canonical" href="${origin}"`,
        )),
    `${path}: configured canonical`,
  );
  if (production) assert.ok(sitemapURLs.includes(canonical), `${path}: sitemap inclusion`);
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
  assert.ok(
    main.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, "")
      .length > 300,
    `${path}: content available without JavaScript`,
  );
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(m[1]);
  for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g))
    if (!m[1].startsWith("/_next/")) links.add(m[1]);
  for (const m of html.matchAll(
    /<(?:img|link)[^>]*(?:src|href)="(\/(?:images|fonts)\/[^"]+)"/g,
  ))
    assets.add(m[1]);
  for (const m of html.matchAll(/(?:src|poster)="(\/(?:images|videos)\/[^\"]+)"/g)) assets.add(m[1]);
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    const meaningfulAlt = /\balt="[^"]+"/.test(m[1]);
    const decorative = /\balt=""/.test(m[1]) && /\baria-hidden="true"|\brole="presentation"/.test(m[1]);
    assert.ok(meaningfulAlt || decorative, `${path}: meaningful alt or explicitly decorative image`);
    assert.ok(
      /\bwidth=/.test(m[1]) && /\bheight=/.test(m[1]),
      `${path}: image dimensions`,
    );
  }
  assert.ok(
    production ? !html.includes('<meta name="robots" content="noindex') : html.includes('<meta name="robots" content="noindex'),
    `${path}: expected indexing policy`,
  );
}
for (const link of [...links, ...assets]) {
  const file = resolve(
    root,
    link === "/"
      ? "index.html"
      : "." + link + (link.split("/").pop().includes(".") ? "" : ".html"),
  );
  await stat(file).catch(() => {
    throw new Error(`Broken internal resource: ${link}`);
  });
}
const robots = await readFile(resolve(root, "robots.txt"), "utf8");
assert.ok(robots.includes("Allow: /"));
assert.equal(robots.includes(`${origin}/sitemap.xml`), production);
const redirects = (await readFile(resolve(root, "_redirects"), "utf8"))
  .split("\n")
  .filter((l) => l.startsWith("/"))
  .map((l) => l.trim().split(/\s+/));
for (const [from, to, status] of redirects) {
  assert.equal(status, "301", `${from}: permanent redirect`);
  await stat(
    resolve(
      root,
      "." + to + (to.split("/").pop().includes(".") ? "" : ".html"),
    ),
  );
}
await mkdir("qa", { recursive: true });
await writeFile(
  "qa/export-verification.json",
  JSON.stringify(
    {
      date: new Date().toISOString().slice(0, 10),
      mode: production ? "production" : "preview",
      pages: expected.length,
      uniqueTitles: titleSet.size,
      uniqueDescriptions: descriptionSet.size,
      uniqueH1s: h1Set.size,
      internalResourcesChecked: links.size + assets.size,
      sitemapURLs: sitemapURLs.length,
      structuredData: "valid JSON",
      javascriptDisabledContent: "present on every page",
      result: "passed",
    },
    null,
    2,
  ),
);
console.log(
  `PASS: ${expected.length} static pages, unique titles/descriptions/H1s, configured canonicals, sitemap, valid JSON-LD, ${links.size + assets.size} internal resources and ${redirects.length} permanent redirects.`,
);

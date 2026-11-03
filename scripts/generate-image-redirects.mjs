import { readFile, writeFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("research/assets.json", "utf8"));
const redirects = new Map();
for (const asset of manifest.assets) {
  if (!asset.file || !asset.source?.startsWith("https://haloinspection.ae/"))
    continue;
  const path = new URL(asset.source).pathname;
  if (path.startsWith("/lovable-uploads/") && !redirects.has(path))
    redirects.set(path, asset.file);
}
redirects.set("/lovable-uploads/new/logo.svg", "/images/logo.svg");
redirects.set("/lovable-uploads/fav2.png", "/images/favicon.png");
const existing = (await readFile("public/_redirects", "utf8"))
  .split("# Original image URLs")[0]
  .trimEnd();
await writeFile(
  "public/_redirects",
  existing +
    "\n\n# Original image URLs retained with permanent redirects to optimized assets.\n" +
    [...redirects].map(([from, to]) => `${from} ${to} 301`).join("\n") +
    "\n",
);
await writeFile(
  "research/legacy-image-redirects.json",
  JSON.stringify(Object.fromEntries(redirects), null, 2),
);
console.log(`Generated ${redirects.size} original image URL redirects.`);

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const mappings = JSON.parse(await readFile(new URL("src/lib/legacy-redirects.json", root), "utf8"));
const path = new URL("public/_redirects", root);
const current = await readFile(path, "utf8");
const marker = "# Original image URLs";
const index = current.indexOf(marker);
if (index < 0) throw new Error(`Missing image redirect section: ${fileURLToPath(path)}`);
const lines = [
  "# Page aliases verified against the live sitemap and router (2026-11-03).",
  "# Send both slash forms directly to the final canonical URL.",
];
for (const [source, target] of Object.entries(mappings)) {
  lines.push(`${source} ${target} 301`, `${source}/ ${target} 301`);
}
await writeFile(path, `${lines.join("\n")}\n\n${current.slice(index)}`);
console.log(`Generated ${Object.keys(mappings).length * 2} page redirects; original image mappings preserved.`);

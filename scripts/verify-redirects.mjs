import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const out = join(root, "out");
const read = (path) => readFileSync(join(root, path), "utf8");
const inventory = JSON.parse(read("research/redirect-audit-2026-11-03.json"));
const aliases = JSON.parse(read("src/lib/legacy-redirects.json"));
const text = read("public/_redirects");
assert.equal(text, read("out/_redirects"), "Exported redirects are stale. Rebuild before verification.");

// Read actual directory entries so a Mac's case-insensitive filesystem cannot
// accidentally treat /Contact.html as the exported /contact.html.
function* files(directory, prefix = "") {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = `${prefix}${entry.name}`;
    if (entry.isDirectory()) yield* files(join(directory, entry.name), `${path}/`);
    else yield path;
  }
}
const exported = new Set(files(out));
const hasPage = (path) => exported.has(path === "/" ? "index.html" : `${path.slice(1)}.html`);
const hasTarget = (path) => hasPage(path) || exported.has(path.slice(1));
const redirects = new Map();
for (const line of text.split("\n")) {
  if (!line || line.startsWith("#")) continue;
  const parts = line.trim().split(/\s+/);
  assert.equal(parts.length, 3, `Invalid redirect rule: ${line}`);
  const [source, target, status] = parts;
  assert.ok(source.startsWith("/") && target.startsWith("/"), `Expected same-site paths: ${line}`);
  assert.equal(status, "301", `Expected permanent redirect: ${line}`);
  assert.ok(!redirects.has(source), `Duplicate redirect: ${source}`);
  assert.notEqual(source, target, `Self redirect: ${source}`);
  assert.ok(!hasPage(source) && !exported.has(source.slice(1)), `Redirect shadows a real exported URL: ${source}`);
  assert.ok(hasTarget(target), `Missing or wrongly cased target: ${target}`);
  redirects.set(source, target);
}
for (const [source, target] of redirects) {
  assert.ok(!redirects.has(target), `Redirect chain or loop: ${source} → ${target}`);
}
for (const [source, target] of Object.entries(aliases)) {
  assert.equal(redirects.get(source), target, `Missing page alias: ${source}`);
  assert.equal(redirects.get(`${source}/`), target, `Missing direct slash alias: ${source}/`);
}
for (const [source, target] of Object.entries(inventory.clientRedirects)) {
  assert.equal(redirects.get(source), target, `Live client redirect was not migrated: ${source}`);
}
for (const url of inventory.sitemapUrls) {
  const path = new URL(url).pathname;
  assert.ok(hasPage(path) || redirects.has(path), `Live sitemap URL is not preserved: ${path}`);
}
const deferred = new Set(inventory.unmigratedRoutes.map((item) => item.path));
for (const path of inventory.routerPaths) {
  if (path === "*" || deferred.has(path)) continue;
  assert.ok(!path.includes(":"), `Unreviewed dynamic legacy route: ${path}`);
  assert.ok(hasPage(path) || redirects.has(path), `Live router URL is not preserved: ${path}`);
}
console.log(`PASS: ${inventory.sitemapUrls.length} live sitemap URLs preserved; ${redirects.size} permanent redirects, exact-case targets, no shadowed pages or chains.`);
for (const item of inventory.unmigratedRoutes) {
  console.warn(`Content migration still needed: ${item.path} — ${item.reason}`);
}

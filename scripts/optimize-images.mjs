#!/usr/bin/env node
/**
 * Responsive derivatives for the WebPs the site renders.
 *
 * Every file in `public/images/` is a single width, so a phone at 390 CSS
 * pixels downloads the same 1600-wide frame a desktop does, and a 31px report
 * thumbnail downloads an 824-wide defect photograph. This script closes that
 * gap — for every image it writes the smaller widths beside it as
 * `<base>-<width>.webp`, and records what exists in
 * `src/lib/image-manifest.json` so `<Img>` can build a `srcset` without
 * guessing which files are on disk.
 *
 *   npm run assets:images
 *
 * The original stays the largest candidate rather than being re-encoded: a
 * bucket within 10% of its width would only add a near-duplicate download for
 * the browser to choose between.
 *
 * `existing/` and `legacy/` are skipped: they hold the old site's images,
 * served only as redirect targets for its URLs, never rendered by a page.
 *
 * Re-running is cheap — a derivative is rebuilt only when its source is newer,
 * and derivatives whose source is gone (or which no longer fall in the ladder)
 * are pruned, so the folders never drift from the manifest.
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = path.join(ROOT, "public/images");
const MANIFEST = path.join(ROOT, "src/lib/image-manifest.json");
const PUBLIC_PREFIX = "/images";
const SKIP = new Set(["existing", "legacy"]);

/** The widths a visitor's viewport actually lands on, phone through 2x desktop.
    320 is not a viewport — it is the small slots (a report thumbnail, a
    credential badge) whose largest rendered size is a couple of hundred pixels. */
const WIDTHS = [320, 480, 768, 1200, 1920];
const QUALITY = 82;
/** How close to the source width a bucket may get before it is not worth writing. */
const MIN_STEP = 0.9;

/* A derivative is anything ending `-<ladder width>.webp`, which also means a
   source image may not be named that way — it would be read as one and
   pruned. The match is held to the ladder's own widths, not any number,
   because sources such as `inspection/local-insights-1.webp` already end in
   one. */
const DERIVATIVE = new RegExp(`^(.*)-(${WIDTHS.join("|")})\\.webp$`);

/** Every `.webp` under `public/images/`, as a path relative to it. */
async function walk(dir = "") {
  const found = [];
  for (const entry of await fs.readdir(path.join(IMAGES, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP.has(entry.name)) found.push(...(await walk(rel)));
    } else if (entry.name.endsWith(".webp")) {
      found.push(rel);
    }
  }
  return found;
}

async function isStale(source, derivative) {
  try {
    const [s, d] = await Promise.all([fs.stat(source), fs.stat(derivative)]);
    return s.mtimeMs > d.mtimeMs;
  } catch {
    return true;
  }
}

let written = 0;
let reused = 0;
let pruned = 0;

async function derive(rel) {
  const source = path.join(IMAGES, rel);
  const base = rel.slice(0, -".webp".length);
  const { width, height } = await sharp(source).metadata();

  const widths = WIDTHS.filter((w) => w < width * MIN_STEP);
  for (const w of widths) {
    const out = path.join(IMAGES, `${base}-${w}.webp`);
    if (!(await isStale(source, out))) {
      reused += 1;
      continue;
    }
    await sharp(source, { limitInputPixels: false })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, alphaQuality: 100, effort: 6, smartSubsample: true })
      .toFile(out);
    written += 1;
  }

  return [`${PUBLIC_PREFIX}/${rel}`, { width, height, widths }];
}

const all = await walk();
const sources = all.filter((rel) => !DERIVATIVE.test(path.posix.basename(rel))).sort();

const entries = [];
for (const rel of sources) entries.push(await derive(rel));

/** Remove derivatives no source claims — a renamed image, or a dropped bucket. */
const expected = new Set(
  entries.flatMap(([src, { widths }]) => {
    const base = src.slice(PUBLIC_PREFIX.length + 1, -".webp".length);
    return widths.map((w) => `${base}-${w}.webp`);
  }),
);
for (const rel of all) {
  if (!DERIVATIVE.test(path.posix.basename(rel)) || expected.has(rel)) continue;
  await fs.unlink(path.join(IMAGES, rel));
  pruned += 1;
  console.log(`  - ${rel}`);
}

await fs.writeFile(MANIFEST, `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`);

const bytes = async (rel) => (await fs.stat(path.join(IMAGES, rel))).size;
for (const [src, { width, height, widths }] of entries) {
  const rel = src.slice(PUBLIC_PREFIX.length + 1);
  const ladder = widths.length ? `${widths.join(", ")}, ${width}` : `${width} only`;
  console.log(`${rel.padEnd(42)} ${`${width}x${height}`.padEnd(10)} ${((await bytes(rel)) / 1024).toFixed(0).padStart(4)} KB  → ${ladder}`);
}
console.log(`\n${entries.length} images · ${written} written · ${reused} up to date · ${pruned} pruned`);
console.log(`manifest: ${path.relative(ROOT, MANIFEST)}`);

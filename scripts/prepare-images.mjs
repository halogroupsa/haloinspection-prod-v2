#!/usr/bin/env node
/**
 * Turn a source image (PNG, JPG or an oversized WebP) into a delivery-ready
 * WebP in public/images/:
 *
 *   node scripts/prepare-images.mjs public/images/cpi.png:cpi.webp:mark \
 *                                   ~/Downloads/a.png:villa.webp
 *
 * `kind` decides the byte budget and delivery width, and defaults to `card`.
 * `full` is for full-bleed photographs; `mark` is for logos and badges, which
 * keep their transparency and are capped well below a photograph's width —
 * the largest of them renders at 180 CSS pixels.
 *
 * sharp does not carry input metadata into the output unless asked to, so the
 * EXIF, XMP and any C2PA provenance block attached by a generator are dropped
 * here rather than in a separate cleaning step.
 *
 * Run `npm run assets:images` afterwards so the new file gets its ladder of
 * smaller widths and a manifest entry.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const budgets = {
  full: { maxBytes: 240_000, width: 1920, quality: 76 },
  card: { maxBytes: 140_000, width: 1440, quality: 76 },
  /* Logos carry small type and hard edges, which lossy WebP smears first, so
     they start higher and stay within a far smaller budget. */
  mark: { maxBytes: 40_000, width: 480, quality: 90 },
};

const jobs = process.argv.slice(2).map((arg) => {
  const [source, outputName, kind = "card"] = arg.split(":");
  if (!source || !outputName) {
    throw new Error(`Expected <source>:<output.webp>[:full|card|mark], got "${arg}"`);
  }
  if (!budgets[kind]) throw new Error(`Unknown kind "${kind}" in "${arg}"`);
  return { source, outputName, kind };
});

if (jobs.length === 0) {
  console.error("Usage: node scripts/prepare-images.mjs <src>:<name.webp>[:full|card|mark] ...");
  process.exit(1);
}

const outputRoot = path.resolve("public/images");
await fs.mkdir(outputRoot, { recursive: true });

for (const { source, outputName, kind } of jobs) {
  const { maxBytes, width, quality: start } = budgets[kind];
  let quality = start;
  let buffer;

  do {
    buffer = await sharp(source, { limitInputPixels: false })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, alphaQuality: 100, effort: 6, smartSubsample: true })
      .toBuffer();
    quality -= 4;
  } while (buffer.length > maxBytes && quality >= 48);

  const output = path.join(outputRoot, outputName);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, buffer);

  const before = (await fs.stat(source)).size;
  const meta = await sharp(buffer).metadata();
  const clean = !meta.exif && !meta.xmp && !meta.icc;
  console.log(
    `${outputName}\t${meta.width}x${meta.height}\t${(before / 1024).toFixed(0)} KB → ${(buffer.length / 1024).toFixed(0)} KB\t${clean ? "metadata clean" : "METADATA PRESENT"}`,
  );
}

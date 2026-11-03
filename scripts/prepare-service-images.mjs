import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Re-encode the generated originals without changing their photographic content.
const root = process.cwd();
const { assets } = JSON.parse(await fs.readFile("design/service-images/assets.json", "utf8"));
for (const asset of assets) {
  const source = path.join(root, asset.original);
  try { await fs.access(source); } catch { continue; }
  const destination = path.join(root, "public/images", `${asset.image}.webp`);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await sharp(source).resize({ width: 1536, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6, smartSubsample: true }).toFile(destination);
  console.log(`${asset.key}: ${Math.round((await fs.stat(destination)).size / 1024)} KB`);
}

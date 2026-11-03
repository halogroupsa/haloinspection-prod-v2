import http from "node:http";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};
const redirectText = await readFile(resolve(root, "_redirects"), "utf8");
const aliases = Object.fromEntries(
  redirectText
    .split("\n")
    .filter((l) => l.startsWith("/"))
    .map((l) => l.trim().split(/\s+/).slice(0, 2)),
);
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (aliases[pathname]) {
      res.writeHead(301, { Location: aliases[pathname] + url.search });
      res.end();
      return;
    }
    if (pathname.length > 1 && pathname.endsWith("/")) {
      res.writeHead(301, { Location: pathname.slice(0, -1) + url.search });
      res.end();
      return;
    }
    let file = resolve(root, pathname === "/" ? "index.html" : "." + pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    if (!extname(file)) file += ".html";
    let status = 200;
    try {
      await stat(file);
    } catch {
      file = resolve(root, "404.html");
      status = 404;
    }
    const info = await stat(file);
    const headers = {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": pathname.startsWith("/_next/static/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
    };
    if (extname(file) === ".mp4") {
      headers["Accept-Ranges"] = "bytes";
      const match = req.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
      if (req.headers.range && !match) {
        res.writeHead(416, { "Content-Range": `bytes */${info.size}` });
        res.end();
        return;
      }
      const start = match ? (match[1] ? Number(match[1]) : Math.max(0, info.size - Number(match[2]))) : 0;
      const end = match && match[1] && match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
      if (start > end || start >= info.size) {
        res.writeHead(416, { "Content-Range": `bytes */${info.size}` });
        res.end();
        return;
      }
      headers["Content-Length"] = end - start + 1;
      if (match) headers["Content-Range"] = `bytes ${start}-${end}/${info.size}`;
      res.writeHead(match ? 206 : status, headers);
      if (req.method === "HEAD") res.end();
      else createReadStream(file, { start, end }).on("error", () => res.destroy()).pipe(res);
      return;
    }
    const body = await readFile(file);
    res.writeHead(status, { ...headers, "Content-Length": body.length });
    if (req.method === "HEAD") res.end();
    else res.end(body);
  } catch {
    res.writeHead(400);
    res.end("Bad request");
  }
});
server.listen(port, "127.0.0.1", () =>
  process.stdout.write(`Halo static preview: http://127.0.0.1:${port}\n`),
);

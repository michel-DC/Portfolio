import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filmRoot = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.MEDIA_PREVIEW_PORT ?? 4199);
const files = new Map([
  ["/film.mp4", { path: path.join(filmRoot, "exports/michel-djoumessi-v2-motion.mp4"), mime: "video/mp4" }],
  ["/poster.jpg", { path: path.join(filmRoot, "exports/affiche.jpg"), mime: "image/jpeg" }],
]);
const page = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Michel Djoumessi — Film</title><style>body{margin:0;background:#fff;color:#173f35;font:16px system-ui}main{max-width:1600px;margin:auto;padding:24px}video{display:block;width:100%;max-height:calc(100vh - 110px);background:#fff}button{margin-top:16px;padding:12px 24px;background:#173f35;border:0;border-radius:24px;color:#fff;cursor:pointer}p{display:inline;margin-left:20px}</style><main><video controls playsinline preload="auto" poster="/poster.jpg" src="/film.mp4" aria-label="Film de portfolio de Michel Djoumessi"></video><button type="button" id="play">Lire le film avec le son</button><p>V2 · En mouvement · 32 secondes</p></main><script>document.getElementById('play').addEventListener('click',()=>{const video=document.querySelector('video');video.muted=false;video.play().catch(error=>{document.querySelector('p').textContent=error.message;});});</script></html>`;

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url ?? "/", `http://localhost:${port}`).pathname;
  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(page);
    return;
  }
  const file = files.get(pathname);
  if (!file || !fs.existsSync(file.path)) { response.writeHead(404); response.end("Not found"); return; }
  const { size } = fs.statSync(file.path);
  const range = request.headers.range;
  if (range) {
    const match = /^bytes=(\d+)-(\d*)$/.exec(range);
    const start = match ? Number(match[1]) : NaN;
    const end = match && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
    if (!Number.isInteger(start) || start < 0 || start > end || start >= size) {
      response.writeHead(416, { "Content-Range": `bytes */${size}` }); response.end(); return;
    }
    response.writeHead(206, { "Content-Type": file.mime, "Content-Length": end - start + 1, "Accept-Ranges": "bytes", "Content-Range": `bytes ${start}-${end}/${size}` });
    fs.createReadStream(file.path, { start, end }).pipe(response);
    return;
  }
  response.writeHead(200, { "Content-Type": file.mime, "Content-Length": size, "Accept-Ranges": "bytes" });
  if (request.method === "HEAD") response.end();
  else fs.createReadStream(file.path).pipe(response);
});

server.listen(port, "localhost", () => console.log(`Film preview ready at http://localhost:${port}`));

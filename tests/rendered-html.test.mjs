import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the TravelFilm case showcase", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>TravelFilm｜把旅行变成可以回去的地方<\/title>/i);
  assert.match(html, /把旅行/);
  assert.match(html, /从足迹进入一卷旅程/);
  assert.match(html, /从一张照片，到回顾与分享/);
  assert.match(html, /\/screens\/01-footprints-overview\.jpg/);
  assert.match(html, /\/screens\/08-share-poster\.jpg/);
  assert.equal((html.match(/class="shot-card"/g) ?? []).length, 8);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the visual and screenshot-slot contract", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.equal((page.match(/index: "0[1-8]"/g) ?? []).length, 8);
  assert.equal((page.match(/image: publicAsset\("\/screens\//g) ?? []).length, 8);
  assert.match(css, /--orange:\s*#ff7733/i);
  assert.match(css, /grid-template-columns:\s*repeat\(4,/i);
  assert.match(css, /aspect-ratio:\s*640\s*\/\s*1387/i);
  assert.match(css, /\.case-section\s*\{[^}]*width:\s*min\(100%,\s*1420px\)/i);
  assert.match(css, /\.hero h1\s*\{[^}]*font-size:\s*5\.875rem/i);
  assert.match(css, /\.section-heading\s*\{[^}]*flex-direction:\s*column/i);
  assert.match(css, /html\s*\{[^}]*overflow-x:\s*clip/i);
  assert.match(css, /@media\s*\(max-width:\s*1120px\)[\s\S]*?grid-template-columns:\s*repeat\(2,/i);
  assert.match(css, /\.shot-card:nth-child\(even\)\s*\{[^}]*margin-top:\s*48px/i);
  assert.doesNotMatch(css, /overflow-x:\s*auto|scroll-snap-type:\s*x/i);
  assert.doesNotMatch(css, /\.hero h1 span\s*\{[^}]*display:\s*block/i);
  assert.doesNotMatch(css, /\.section-copy h2\s*\{[^}]*max-width:\s*1[12]ch/i);
  assert.match(css, /@media\s*\(max-width:\s*560px\)[\s\S]*?\.section-copy h2\s*\{[^}]*white-space:\s*nowrap/i);
  assert.doesNotMatch(css, /\.shot-copy\s*\{[^}]*border-bottom/i);
  assert.match(layout, /new URL\("og\.png", siteUrl\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

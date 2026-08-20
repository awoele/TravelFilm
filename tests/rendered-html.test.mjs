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
  assert.equal((html.match(/class="hero-photo-slot hero-photo-slot-/g) ?? []).length, 6);
  assert.equal((html.match(/class="hero-photo-image"/g) ?? []).length, 6);
  assert.match(html, /\/hero-memory\/01-center-red-cap\.jpg/);
  assert.match(html, /CHAHAR · AUG 2026/);
  assert.doesNotMatch(html, /待补 6 张照片|旅行照片占位/);
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
  assert.match(css, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(3\.1rem,\s*4\.25vw,\s*4\.55rem\)/i);
  assert.match(css, /\.section-heading\s*\{[^}]*align-items:\s*center[^}]*flex-direction:\s*column[^}]*text-align:\s*center/i);
  assert.match(css, /html\s*\{[^}]*overflow-x:\s*clip/i);
  assert.match(css, /@media\s*\(max-width:\s*1120px\)[\s\S]*?grid-template-columns:\s*repeat\(2,/i);
  assert.match(css, /@media\s*\(min-width:\s*1121px\)/i);
  assert.match(css, /grid-template-rows:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)\s*auto/i);
  assert.match(css, /\.hero-page\s*\{[^}]*--font-display:[^}]*--font-utility:[^}]*font-family:\s*var\(--font-display\)/i);
  assert.match(css, /@media\s*\(min-width:\s*1121px\)[\s\S]*?\.hero-page\s*\{[^}]*width:\s*min\(100%,\s*1420px\)[^}]*margin-inline:\s*auto/i);
  assert.match(css, /@media\s*\(min-width:\s*1121px\)[\s\S]*?\.hero\s*\{[^}]*width:\s*min\(100%,\s*1650px\)[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*clamp\(360px,\s*34vw,\s*580px\)/i);
  assert.match(css, /@media\s*\(min-width:\s*1121px\)[\s\S]*?\.hero-copy\s*\{[^}]*align-self:\s*center[^}]*padding-top:\s*0/i);
  assert.match(css, /@media\s*\(min-width:\s*1121px\)[\s\S]*?\.hero-memory-collage\s*\{[^}]*align-self:\s*center/i);
  assert.match(css, /@media\s*\(min-width:\s*1600px\)[\s\S]*?\.hero\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*480px[^}]*gap:\s*52px/i);
  assert.match(css, /@media\s*\(min-width:\s*1600px\)[\s\S]*?\.hero h1\s*\{[^}]*font-size:\s*4\.2rem/i);
  assert.match(css, /\.hero-bottom\s*\{[^}]*display:\s*flex[^}]*flex-direction:\s*column/i);
  assert.match(css, /\.product-logic\s*\{[^}]*border-top:\s*1px\s+solid\s+var\(--line-strong\)/i);
  assert.match(css, /\.product-logic\s*\{[^}]*width:\s*min\(76%,\s*680px\)/i);
  assert.match(css, /\.product-logic b\s*\{[^}]*font-size:\s*clamp\(17px,\s*1\.2vw,\s*20px\)/i);
  assert.match(css, /@media\s*\(min-width:\s*1121px\)[\s\S]*?\.product-logic\s*\{[^}]*width:\s*clamp\(480px,\s*36vw,\s*560px\)/i);
  assert.match(css, /@media\s*\(min-width:\s*1121px\)[\s\S]*?\.product-logic b\s*\{[^}]*font-size:\s*clamp\(23px,\s*1\.55vw,\s*28px\)/i);
  assert.match(css, /@media\s*\(min-width:\s*1121px\)[\s\S]*?\.hero-bottom\s*>\s*p\s*\{[^}]*white-space:\s*nowrap/i);
  assert.match(css, /--desktop-phone-height:\s*clamp\(480px,\s*calc\(100svh\s*-\s*222px\),\s*558px\)/i);
  assert.match(css, /calc\(var\(--desktop-phone-height\)\s*\*\s*640\s*\/\s*1387\)/i);
  assert.match(css, /\.hero-photo-slot\s*\{[^}]*aspect-ratio:\s*2\s*\/\s*3/i);
  assert.match(css, /\.hero-photo-image\s*\{[^}]*object-fit:\s*cover/i);
  assert.match(css, /\.hero-photo-slot-1\s*\{[^}]*top:\s*22%[^}]*left:\s*29%[^}]*width:\s*42%/i);
  assert.doesNotMatch(css, /\.hero-photo-slot-1\s*\{[^}]*border-color:\s*rgba\(255,\s*119,\s*51/i);
  assert.doesNotMatch(css, /\.hero-photo-slot-1\s*\{[^}]*box-shadow:[^}]*rgba\(255,\s*119,\s*51/i);
  assert.match(css, /\.shot-image\s*\{[^}]*object-fit:\s*cover/i);
  assert.match(css, /\.shot-card:nth-child\(even\)\s*\{[^}]*margin-top:\s*48px/i);
  assert.doesNotMatch(css, /overflow-x:\s*auto|scroll-snap-type:\s*x/i);
  assert.doesNotMatch(css, /scroll-snap-type:\s*y|height:\s*100svh|\.intro-screen/i);
  assert.doesNotMatch(css, /@media\s*\(min-width:\s*1500px\)/i);
  assert.doesNotMatch(page, /className="intro-screen"/i);
  assert.doesNotMatch(css, /\.hero h1 span\s*\{[^}]*display:\s*block/i);
  assert.doesNotMatch(css, /\.section-copy h2\s*\{[^}]*max-width:\s*1[12]ch/i);
  assert.match(css, /@media\s*\(max-width:\s*560px\)[\s\S]*?\.section-copy h2\s*\{[^}]*white-space:\s*nowrap/i);
  assert.match(css, /@media\s*\(max-width:\s*560px\)[\s\S]*?\.hero-memory-collage figcaption\s*\{[^}]*font-size:\s*7px/i);
  assert.doesNotMatch(css, /\.shot-copy\s*\{[^}]*border-bottom/i);
  assert.match(layout, /new URL\("og\.png", siteUrl\)/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

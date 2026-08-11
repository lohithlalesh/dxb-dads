import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const previewRoot = new URL("../app/_sites-preview/", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://dxb-dads.example/", {
      headers: {
        accept: "text/html",
        host: "dxb-dads.example",
        "x-forwarded-host": "dxb-dads.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished DXB Dads landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>DXB Dads Podcast — Fatherhood, Family &amp; Real Talk in Dubai<\/title>/i,
  );
  assert.match(html, /REAL DADS/);
  assert.match(html, /REAL LIFE/);
  assert.match(html, /REAL TALK/);
  assert.match(html, /Three dads\. Three cultures\./i);
  assert.match(html, /ARE WE THERE YET/i);
  assert.match(html, /Choose a conversation/i);
  assert.match(html, /Pranav/);
  assert.match(html, /Mustapha/);
  assert.match(html, /Pavle Rastovic/);
  assert.match(html, /https:\/\/www\.youtube\.com\/@DXBDads/);
  assert.match(html, /https:\/\/open\.spotify\.com\/show\/033XRlOY44hvb5tbVHd6e1/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /\/dxb-dads-logo-clean\.png/);
  assert.match(html, /\/podcast-pranav\.jpg/);
  assert.match(html, /\/podcast-mustapha\.jpg/);
  assert.match(html, /\/podcast-pavle\.jpg/);
  assert.match(html, /class="hero split-hero"/);
  assert.match(html, /class="show-poster hero-art"/);
  assert.match(html, /class="host-cutout cutout-mustapha"/);
  assert.match(html, /\/host-cutout-pranav\.png/);
  assert.match(html, /\/host-cutout-mustapha\.png/);
  assert.match(html, /\/host-cutout-pavle\.png/);
  assert.match(html, /class="platform-icon"/);
  assert.match(html, /class="pulp-halftone"/);
  assert.doesNotMatch(html, /hero-art-grid|hero-art-orbit|hero-waveform/);
  assert.match(html, /A FATHERHOOD/);
  assert.match(
    html,
    /https:\/\/dxb-dads\.laleshlohith\.chatgpt\.site\/og\.png/,
  );
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("removes the disposable starter and keeps accessibility motion controls", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await assert.rejects(access(new URL("SkeletonPreview.tsx", previewRoot)));
  await assert.rejects(access(new URL("preview.css", previewRoot)));
  await access(new URL("../public/dxb-dads-studio.png", import.meta.url));
  await access(new URL("../public/dxb-dads-logo-clean.png", import.meta.url));
  await access(new URL("../public/dxb-dads-cutout.png", import.meta.url));
  await access(new URL("../public/podcast-wide-01.jpg", import.meta.url));
  await access(new URL("../public/podcast-wide-02.jpg", import.meta.url));
  await access(new URL("../public/podcast-pranav.jpg", import.meta.url));
  await access(new URL("../public/podcast-mustapha.jpg", import.meta.url));
  await access(new URL("../public/podcast-pavle.jpg", import.meta.url));
  await access(new URL("../public/podcast-conversation.jpg", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/llms.txt", import.meta.url));
  await access(new URL("../public/llms-full.txt", import.meta.url));
  await access(new URL("../public/robots.txt", import.meta.url));

  assert.match(page, /className="skip-link"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /PodcastSeries/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /max-video-preview/);
  assert.match(css, /family=Anton/);
  assert.match(css, /--display:\s*"Anton"/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(packageJson, /"name": "dxb-dads"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(
    `${page}\n${layout}\n${css}`,
    /codex-preview|SkeletonPreview|Starter Project/,
  );

  await assert.rejects(
    access(new URL("public/_sites-preview", templateRoot)),
  );
});

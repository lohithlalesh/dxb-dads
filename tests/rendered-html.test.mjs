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
    /<title>DXB Dads — Real Dads\. Real Talk\. Dubai Life\.<\/title>/i,
  );
  assert.match(html, /THREE DADS\./);
  assert.match(html, /ONLY DAUGHTERS\./);
  assert.match(html, /ZERO FILTER\./);
  assert.match(html, /Built in Dubai\./);
  assert.match(html, /FIRST/);
  assert.match(html, /CONVERSATIONS/);
  assert.match(html, /\/dxb-dads-logo-clean\.png/);
  assert.match(html, /Coming Soon/);
  assert.match(html, /https:\/\/dxb-dads\.example\/og\.png/);
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
  await access(new URL("../public/og.png", import.meta.url));

  assert.match(page, /className="skip-link"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(layout, /generateMetadata/);
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

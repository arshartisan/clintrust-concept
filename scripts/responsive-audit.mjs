// Responsive audit over CDP: overflow check + screenshots per route and width.
// Usage: BASE=http://localhost:3000 node scripts/responsive-audit.mjs <outDir> [routes...]
// Needs Google Chrome at the path below and a running server (dev or `next start`).
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const out = process.argv[2];
const routes = process.argv.slice(3).length
  ? process.argv.slice(3)
  : ["/", "/approach", "/about", "/insights", "/insights/why-site-payments-are-still-delayed", "/contact"];
const sizes = [
  { name: "360", width: 360, height: 780, mobile: true, dpr: 2 },
  { name: "390", width: 390, height: 844, mobile: true, dpr: 3 },
  { name: "768", width: 768, height: 1024, mobile: true, dpr: 2 },
  { name: "1024", width: 1024, height: 768, mobile: false, dpr: 1 },
  { name: "1440", width: 1440, height: 900, mobile: false, dpr: 1 },
];
mkdirSync(out, { recursive: true });

const port = 9333;
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${join(out, "profile")}`,
  "--hide-scrollbars",
  "--no-first-run",
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
for (let i = 0; i < 40; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const page = list.find((t) => t.type === "page");
    if (page) {
      ws = new WebSocket(page.webSocketDebuggerUrl);
      break;
    }
  } catch {}
  await sleep(250);
}
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pending = new Map();
const listeners = [];
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else if (msg.method) listeners.forEach((l) => l(msg));
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const n = ++id;
    pending.set(n, resolve);
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send("Page.enable");
await send("Runtime.enable");
const consoleErrors = [];
listeners.push((m) => {
  if (m.method === "Runtime.exceptionThrown") consoleErrors.push(m.params.exceptionDetails?.exception?.description ?? "exception");
  if (m.method === "Runtime.consoleAPICalled" && (m.params.type === "error" || m.params.type === "warning"))
    consoleErrors.push(`${m.params.type}: ${m.params.args.map((a) => a.value ?? a.description).join(" ")}`.slice(0, 200));
});

const report = [];
for (const size of sizes) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: size.width,
    height: size.height,
    deviceScaleFactor: 1,
    mobile: size.mobile,
  });
  await send("Emulation.setTouchEmulationEnabled", { enabled: size.mobile });
  for (const route of routes) {
    consoleErrors.length = 0;
    const loaded = new Promise((r) => {
      const l = (m) => {
        if (m.method === "Page.loadEventFired") {
          listeners.splice(listeners.indexOf(l), 1);
          r();
        }
      };
      listeners.push(l);
    });
    await send("Page.navigate", { url: `${process.env.BASE ?? "http://localhost:3000"}${route}` });
    await loaded;
    await sleep(800);
    // Scroll through the page so InView / Reveal content renders, then back up.
    await evaluate(`(async () => {
      const step = innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
      await new Promise(r => setTimeout(r, 600));
      scrollTo(0, 0);
    })()`);
    await sleep(400);
    const result = await evaluate(`(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const over = de.scrollWidth - vw;
      const offenders = [];
      if (over > 0) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width && (r.right > vw + 1 || r.left < -1)) {
            // Skip elements inside an overflow-clipping ancestor.
            let p = el.parentElement, clipped = false;
            while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') { clipped = true; break; } p = p.parentElement; }
            if (!clipped) offenders.push((el.tagName.toLowerCase() + '.' + String(el.className?.baseVal ?? el.className).split(' ').slice(0,4).join('.')).slice(0,140) + ' right=' + Math.round(r.right));
          }
        }
      }
      // Text that overflows its own box horizontally (clipped words).
      const tight = [];
      for (const el of document.querySelectorAll('h1,h2,h3,h4,p,a,button,span,dd,dt,li')) {
        if (el.children.length === 0 && el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX !== 'visible')
          tight.push(el.tagName.toLowerCase() + ': ' + el.textContent.trim().slice(0, 50));
      }
      // Tap targets under 24px on touch layouts.
      const small = [];
      for (const el of document.querySelectorAll('a[href],button')) {
        const r = el.getBoundingClientRect();
        if (r.width && r.height && (r.width < 24 || r.height < 24) && getComputedStyle(el).visibility !== 'hidden')
          small.push((el.getAttribute('aria-label') || el.textContent.trim() || el.tagName).slice(0, 40) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
      }
      return { over, offenders: [...new Set(offenders)].slice(0, 12), tight: tight.slice(0, 8), small: [...new Set(small)].slice(0, 12), height: de.scrollHeight };
    })()`);
    const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: size.width, height: Math.min(result.height, 6000), scale: size.width < 800 ? 1 : 0.5 } });
    const file = `${route.replace(/\//g, "_") || "_"}-${size.name}.png`.replace(/^_+/, "") || `home-${size.name}.png`;
    writeFileSync(join(out, file === `-${size.name}.png` ? `home-${size.name}.png` : file), Buffer.from(shot.result.data, "base64"));
    report.push({ route, size: size.name, ...result, errors: [...new Set(consoleErrors)].slice(0, 5) });
  }
}
writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
for (const r of report) {
  console.log(`${r.size.padStart(4)} ${r.route.padEnd(48)} overflow=${r.over}px h=${r.height}${r.offenders.length ? "\n      offenders: " + r.offenders.join(" | ") : ""}${r.tight.length ? "\n      clipped: " + r.tight.join(" | ") : ""}${r.errors.length ? "\n      console: " + r.errors.join(" | ") : ""}`);
}
const smallAll = new Map();
for (const r of report) if (r.size === "390") for (const s of r.small) smallAll.set(s, r.route);
console.log("\nsmall tap targets @390:", [...smallAll.entries()].map(([s, r]) => `${s} (${r})`).join(" | "));
ws.close();
chrome.kill();
process.exit(0);

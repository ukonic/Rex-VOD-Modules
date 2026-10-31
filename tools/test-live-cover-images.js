"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFile } = require("child_process");
const { promisify } = require("util");
const registry = require(path.resolve(__dirname, "..", "registry.json"));

const root = path.resolve(__dirname, "..");
const execFileAsync = promisify(execFile);

function load(relative) {
  const context = {
    console, setTimeout, clearTimeout, URL,
    Widget: { http: { get: async (url, options) => {
      const response = await fetch(url, {
        headers: (options && options.headers) || {},
        signal: AbortSignal.timeout(20000)
      });
      const body = await response.text();
      let data = body;
      try { data = JSON.parse(body); } catch (_) {}
      return { statusCode: response.status, data };
    } } }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, ...relative.split("/")), "utf8"), context, { filename: relative });
  return context;
}

async function checkImage(url) {
  let firstError = "";
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", Range: "bytes=0-1023", Accept: "image/*,*/*;q=0.8" },
      signal: AbortSignal.timeout(12000)
    });
    const contentType = response.headers.get("content-type") || "";
    await response.body?.cancel();
    firstError = response.ok && (/^image\//i.test(contentType) ||
      (/^application\/octet-stream/i.test(contentType) && /\.(?:jpe?g|png|webp|gif|avif)(?:[?#]|$)/i.test(url)))
      ? null
      : `HTTP ${response.status} ${contentType || "unknown content type"}`;
  } catch (error) {
    firstError = error && error.message ? error.message : String(error);
  }
  if (!firstError) return null;
  try {
    const command = process.platform === "win32" ? "curl.exe" : "curl";
    const output = process.platform === "win32" ? "NUL" : "/dev/null";
    const { stdout } = await execFileAsync(command, ["-L", "-sS", "-o", output, "-w", "%{http_code}|%{content_type}",
      "--max-time", "15", "-A", "Mozilla/5.0", url], { timeout: 18000 });
    const [status, contentType] = String(stdout).trim().split("|");
    if (/^2\d\d$/.test(status) && (/^image\//i.test(contentType || "") ||
      (/^application\/octet-stream/i.test(contentType || "") && /\.(?:jpe?g|png|webp|gif|avif)(?:[?#]|$)/i.test(url)))) return null;
    return `${firstError}; curl ${status || "failed"} ${contentType || "unknown content type"}`;
  } catch (_) {
    return firstError;
  }
}

async function mapLimit(rows, limit, worker) {
  const result = new Array(rows.length);
  let index = 0;
  async function run() {
    while (index < rows.length) {
      const current = index++;
      result[current] = await worker(rows[current]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, rows.length) }, run));
  return result;
}

(async () => {
  const entries = [];
  const selected = new Set(process.argv.slice(2));
  const rows = selected.size ? registry.filter(row => selected.has(row.id) || selected.has(row.name)) : registry;
  for (const row of rows) {
    const context = load(row.module);
    const loader = context.loadSourceHome || context.loadFeifanList;
    const items = await loader({ page: 1 });
    for (const item of items) entries.push({ source: row.name, title: item.title, url: item.coverUrl });
  }
  const checked = await mapLimit(entries, 16, async entry => ({ ...entry, error: await checkImage(entry.url) }));
  const failures = checked.filter(row => row.error);
  if (failures.length) {
    console.table(failures);
    throw new Error(`${failures.length}/${checked.length} live cover images failed.`);
  }
  console.log(`${checked.length}/${checked.length} first-page cover images returned image content.`);
})().catch(error => { console.error(error); process.exitCode = 1; });

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const registry = require(path.resolve(__dirname, "..", "registry.json"));

const root = path.resolve(__dirname, "..");

function load(relative) {
  const context = {
    console, setTimeout, clearTimeout, URL,
    Widget: { http: { get: async (url, options) => {
      const response = await fetch(url, {
        headers: (options && options.headers) || {},
        signal: AbortSignal.timeout(20000)
      });
      const text = await response.text();
      let data = text;
      try { data = JSON.parse(text); } catch (_) {}
      return { statusCode: response.status, data };
    } } }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, ...relative.split("/")), "utf8"), context, { filename: relative });
  return context;
}

async function verify(row) {
  const context = load(row.module);
  const loader = context.loadSourceHome || context.loadFeifanList;
  const items = await loader({ page: 1 });
  const withCover = items.filter(item => /^https:\/\//i.test(item.coverUrl || "")).length;
  if (items.length && withCover !== items.length) {
    throw new Error(`${row.name}: ${withCover}/${items.length} list items have HTTPS covers`);
  }
  return { name: row.name, count: items.length, covers: withCover };
}

(async () => {
  const results = [];
  const errors = [];
  for (let index = 0; index < registry.length; index += 6) {
    const batch = await Promise.all(registry.slice(index, index + 6).map(row => verify(row).catch(error => {
      errors.push(error.message);
      return { name: row.name, count: 0, covers: 0 };
    })));
    results.push(...batch);
  }
  console.table(results);
  if (errors.length) throw new Error(errors.join("\n"));
  console.log(`${results.length}/${results.length} standalone modules returned cover-complete first pages.`);
})().catch(error => { console.error(error); process.exitCode = 1; });


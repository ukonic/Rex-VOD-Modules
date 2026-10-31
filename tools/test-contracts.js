"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const registry = require(path.resolve(__dirname, "..", "registry.json"));

const root = path.resolve(__dirname, "..");
const files = registry.map(row => path.join(root, ...row.module.split("/")))
  .concat(path.join(root, "aggregate", "Rex-CineVerse", "Rex-CineVerse.js"));
let failed = 0;

for (const file of files) {
  const context = { console, setTimeout, clearTimeout, URL, Widget: { http: { get: async () => ({ statusCode: 200, data: { code: 1, list: [] } }) } } };
  vm.createContext(context);
  try {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
    const metadata = context.WidgetMetadata;
    if (!metadata || !metadata.id || !metadata.title || metadata.author !== "ukonic") throw new Error("invalid WidgetMetadata");
    if (!Array.isArray(metadata.modules) || !metadata.modules.length) throw new Error("missing modules");
    for (const module of metadata.modules) {
      if (!module.id || !module.title || typeof context[module.functionName] !== "function") {
        throw new Error(`missing function for ${module.id || "unknown"}: ${module.functionName}`);
      }
    }
    if (!metadata.search || typeof context[metadata.search.functionName] !== "function") throw new Error("invalid search contract");
    if (typeof context.loadDetail !== "function") throw new Error("missing loadDetail");
    const expected = file.includes("Rex-CineVerse") ? 8 : 7;
    if (metadata.modules.length !== expected) throw new Error(`expected ${expected} modules, got ${metadata.modules.length}`);
    console.log(`PASS ${path.relative(root, file)} (${metadata.modules.length} modules + search)`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${path.relative(root, file)}: ${error.message}`);
  }
}

console.log(`${files.length - failed}/${files.length} stable modules passed contract checks.`);
process.exitCode = failed ? 1 : 0;

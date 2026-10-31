"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const cases = [
  { file: path.join(root, "sources", "zy1080", "Rex-1080-VOD.js"), display: "一零八零资源", forbidden: /1080/i },
  { file: path.join(root, "sources", "zy360", "Rex-360-VOD.js"), display: "三六零资源", forbidden: /360/i }
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const item of cases) {
  const context = { console, setTimeout, clearTimeout, URL, Widget: { http: { get: async () => ({ statusCode: 200, data: { code: 1, list: [] } }) } } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(item.file, "utf8"), context, { filename: item.file });
  const metadata = context.WidgetMetadata;
  const visibleTitles = [metadata.title, metadata.description, metadata.search && metadata.search.title]
    .concat((metadata.modules || []).map(module => module.title)).filter(Boolean);
  assert(metadata.title === item.display, `${path.basename(item.file)} has the wrong display name`);
  assert(visibleTitles.every(title => !item.forbidden.test(title)),
    `${path.basename(item.file)} still exposes a numeric quality-like title: ${visibleTitles.join(" | ")}`);
}

console.log("Numeric source modules use Chinese display names without 1080/360 quality-like labels.");

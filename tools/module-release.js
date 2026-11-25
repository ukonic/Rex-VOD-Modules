"use strict";

const fs = require("node:fs");
const vm = require("node:vm");
const { createHash } = require("node:crypto");

function searchId(title) {
  return createHash("md5").update(title).digest("hex");
}

function literalManifest(source) {
  const block = /^var WidgetMetadata = \{\r?\n[\s\S]*?^\};/m.exec(source);
  if (!block) throw new Error("WidgetMetadata declaration not found in module template");
  const setup = source.slice(0, block.index + block[0].length);
  const manifest = vm.runInNewContext(setup + "\nWidgetMetadata;", {}, { timeout: 1000 });
  return "var WidgetMetadata = " + JSON.stringify(manifest, null, 2) + ";\n\n" +
    source.slice(0, block.index) + source.slice(block.index + block[0].length).replace(/^\s*\n/, "\n");
}

function writeVersion(file, content, verifyOnly = false) {
  if (!fs.existsSync(file)) {
    if (!verifyOnly) fs.writeFileSync(file, content, { encoding: "utf8", flag: "wx" });
    return;
  }
  const normalize = value => value.replace(/\r\n/g, "\n");
  if (normalize(fs.readFileSync(file, "utf8")) !== normalize(content)) {
    throw new Error("Version already exists with different content; bump the version: " + file);
  }
}

module.exports = { searchId, literalManifest, writeVersion };

"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
function collect(folder) {
  const result = [];
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "templates") continue;
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) result.push(...collect(full));
    else if (entry.isFile() && entry.name.endsWith(".js")) result.push(full);
  }
  return result;
}

const files = collect(root).filter(file => !file.includes(`${path.sep}tools${path.sep}templates${path.sep}`));
let failed = 0;
for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (result.status !== 0) {
    failed += 1;
    console.error(path.relative(root, file));
    console.error(result.stderr || result.stdout);
  }
}
console.log(`${files.length - failed}/${files.length} JavaScript files passed syntax check.`);
process.exitCode = failed ? 1 : 0;

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.resolve(__dirname, "..", "aggregate", "Rex-CineVerse", "Rex-CineVerse.js");
const context = {
  console, setTimeout, clearTimeout, URL,
  Widget: { http: { get: async (url, options) => {
    const response = await fetch(url, { headers: (options && options.headers) || {}, signal: AbortSignal.timeout(15000) });
    const text = await response.text();
    let data = text;
    try { data = JSON.parse(text); } catch (_) {}
    return { statusCode: response.status, data };
  } } }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });

async function check(title, forbidden, extra) {
  const resources = await context.loadResource(Object.assign({ title, type: "tv" }, extra || {}));
  console.log(title, resources.length, resources.slice(0, 8).map(row => row.name));
  if (!resources.length) throw new Error(`${title}: no resources`);
  if (!resources.every(row => /\.m3u8(?:[?#]|$)/i.test(row.url))) throw new Error(`${title}: non-M3U8 resource`);
  if (forbidden && resources.some(row => row.name.includes(forbidden))) throw new Error(`${title}: incorrectly matched ${forbidden}`);
}

(async () => {
  await check("花儿与少年", "第八季");
  await check("花儿与少年第八季", "第一季");
  await check("披荆斩棘", "第六季");
  await check("蝙蝠侠：黑暗骑士", null, { year: "2008", type: "movie", seriesName: "The Dark Knight" });
})().catch(error => { console.error(error); process.exitCode = 1; });

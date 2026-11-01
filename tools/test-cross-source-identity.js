"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const target = {
  vod_id: "202",
  vod_name: "目标影片",
  vod_year: "2024",
  type_name: "动作片",
  vod_pic: "https://example.com/target.jpg",
  vod_play_from: "m3u8",
  vod_play_url: "正片$https://example.com/target.m3u8"
};
const collision = {
  vod_id: "101",
  vod_name: "另一个影片",
  vod_year: "2023",
  type_name: "动作片",
  vod_pic: "https://example.com/collision.jpg",
  vod_play_from: "m3u8",
  vod_play_url: "正片$https://example.com/collision.m3u8"
};
const feifanTarget = { ...target, vod_play_from: "ffm3u8" };
const feifanCollision = { ...collision, vod_play_from: "ffm3u8" };

function payload(url) {
  const parsed = new URL(url);
  const query = parsed.searchParams;
  const isFeifan = parsed.hostname === "api.ffzyapi.com";
  const rows = isFeifan ? { "101": feifanCollision, "202": feifanTarget } : { "101": collision, "202": target };
  if (query.get("ids")) {
    const row = rows[query.get("ids")];
    return { statusCode: 200, data: { code: 1, list: row ? [row] : [] } };
  }
  if (query.get("wd")) {
    return { statusCode: 200, data: { code: 1, list: [rows["202"]] } };
  }
  return { statusCode: 200, data: { code: 1, list: [rows["202"]] } };
}

function load(relative) {
  const context = {
    console,
    setTimeout,
    clearTimeout,
    URL,
    Widget: { http: { get: async url => payload(url) } }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function testGeneric() {
  const params = { title: "目标影片", year: "2024", type: "movie", episode: 1 };
  const modules = [
    ["liangzi", "Rex-Liangzi-VOD.js"], ["zuida", "Rex-Zuida-VOD.js"],
    ["wujin", "Rex-Wujin-VOD.js"], ["guangsu", "Rex-Guangsu-VOD.js"],
    ["ruyi", "Rex-Ruyi-VOD.js"], ["youku", "Rex-Youku-VOD.js"],
    ["zy360", "Rex-360-VOD.js"], ["zy1080", "Rex-1080-VOD.js"]
  ];
  for (const [slug, file] of modules) {
    const module = load(`sources/${slug}/${file}`);
    assert(module.sourceId("https://api.ffzyapi.com/api.php/provide/vod/?ac=detail&ids=101") === "",
      `${slug} extracted a foreign API ID`);
    assert(module.sourceId(`rexvod://${slug}/202`) === "202", `${slug} rejected its own internal ID`);
    const foreign = await module.loadResource({ ...params, link: "https://api.ffzyapi.com/api.php/provide/vod/?ac=detail&ids=101" });
    assert(foreign.length === 1 && foreign[0].url.endsWith("target.m3u8"),
      `${slug} did not fall back from a foreign API link`);
    const collisionResult = await module.loadResource({ ...params, link: `rexvod://${slug}/101` });
    assert(collisionResult.length === 1 && collisionResult[0].url.endsWith("target.m3u8"),
      `${slug} did not validate an own ID collision before fallback`);
    const direct = await module.loadResource({ ...params, link: `rexvod://${slug}/202` });
    assert(direct.length === 1 && direct[0].url.endsWith("target.m3u8"),
      `${slug} own internal link did not use direct lookup`);
    const noTitle = await module.loadResource({ link: "https://api.ffzyapi.com/api.php/provide/vod/?ac=detail&ids=101" });
    assert(noTitle.length === 0, `${slug} returned another source's item without a title`);
  }
}

async function testFeifan() {
  const module = load("sources/feifan/Rex-Feifan-VOD.js");
  const params = { title: "目标影片", year: "2024", type: "movie", episode: 1 };
  const search = await module.searchFeifan({ keyword: "目标影片" });
  assert(search.length === 1 && search[0].link === "rexvod://feifan/202",
    "Feifan search did not emit the source-owned link scheme");

  const foreign = await module.loadResource({ ...params, link: "https://api.zuidapi.com/api.php/provide/vod/?ac=detail&ids=101" });
  assert(foreign.length === 1 && foreign[0].url.endsWith("target.m3u8"),
    "Feifan foreign API link did not fall back to title matching");

  const collisionResult = await module.loadResource({ ...params, link: "rexvod://feifan/101" });
  assert(collisionResult.length === 1 && collisionResult[0].url.endsWith("target.m3u8"),
    "Feifan own ID collision was not validated before fallback");

  const legacy = await module.loadResource({ ...params, link: "https://api.ffzyapi.com/api.php/provide/vod/from/ffm3u8/?ac=detail&ids=202" });
  assert(legacy.length === 1 && legacy[0].url.endsWith("target.m3u8"),
    "Feifan legacy own API link stopped working");
}

(async () => {
  await testGeneric();
  await testFeifan();
  console.log("Cross-source identity isolation and fallback checks passed.");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

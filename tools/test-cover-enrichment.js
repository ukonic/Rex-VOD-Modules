"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const listItem = { vod_id: "501", vod_name: "封面补全测试", vod_year: "2026", type_name: "动作片" };
const detailItem = { ...listItem, vod_pic: "upload/501-missing.jpg", vod_pic_thumb: "http://example.com/501.jpg", vod_play_from: "m3u8",
  vod_play_url: "正片$https://example.com/501.m3u8" };

function load(relative) {
  const context = { console, setTimeout, clearTimeout, URL, Widget: { http: { get: async url => {
    const query = new URL(url).searchParams;
    const isSearch = query.has("wd");
    return { statusCode: 200, data: { code: 1, list: query.get("ac") === "detail" && !isSearch ? [detailItem] : [listItem] } };
  } } } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context;
}

(async () => {
  const standalone = load("sources/liangzi/Rex-Liangzi-VOD.js");
  const standaloneItems = await standalone.loadSourceHome({ page: 1 });
  if (standaloneItems.length !== 1 || standaloneItems[0].coverUrl !== "https://example.com/501.jpg") {
    throw new Error("standalone list cover enrichment or HTTPS normalization failed");
  }
  const aggregate = load("aggregate/Rex-CineVerse/Rex-CineVerse.js");
  const aggregateItems = await aggregate.loadCineverseHome({ page: 1 });
  if (!aggregateItems.length || aggregateItems.some(item => item.coverUrl !== "https://example.com/501.jpg")) {
    throw new Error("aggregate list cover enrichment or HTTPS normalization failed");
  }
  const standaloneSearchItems = await standalone.searchSource({ keyword: "封面补全测试" });
  if (standaloneSearchItems.length !== 1 || standaloneSearchItems[0].coverUrl !== "https://example.com/501.jpg") {
    throw new Error("standalone search cover enrichment failed");
  }
  const feifan = load("sources/feifan/Rex-Feifan-VOD.js");
  const feifanItems = await feifan.searchFeifan({ keyword: "封面补全测试" });
  if (feifanItems.length !== 1 || feifanItems[0].coverUrl !== "https://example.com/501.jpg") {
    throw new Error("Feifan search cover enrichment failed");
  }
  console.log("Standalone, Feifan, and aggregate list/search cover enrichment passed.");
})().catch(error => { console.error(error); process.exitCode = 1; });

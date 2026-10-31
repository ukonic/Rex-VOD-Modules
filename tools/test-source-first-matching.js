"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const items = [
  { vod_id: "1", vod_name: "数码宝贝", vod_year: "1999", type_name: "日韩动漫", vod_pic: "https://example.com/1.jpg",
    vod_play_from: "m3u8", vod_play_url: "第01集$https://example.com/digimon-jp-1.m3u8#第06集$https://example.com/digimon-jp-6.m3u8" },
  { vod_id: "2", vod_name: "数码宝贝 国语版", vod_year: "1999", type_name: "日韩动漫", vod_pic: "https://example.com/2.jpg",
    vod_play_from: "m3u8", vod_play_url: "第01集$https://example.com/digimon-cn-1.m3u8#第06-10集$https://example.com/digimon-cn-6-10.m3u8" },
  { vod_id: "3", vod_name: "蝙蝠侠：黑暗骑士", vod_year: "2008", type_name: "动作片", vod_pic: "https://example.com/3.jpg",
    vod_play_from: "m3u8", vod_play_url: "HD中字$https://example.com/batman-zh.m3u8#HD国语$https://example.com/batman-cn.m3u8" }
];

function response(url) {
  const query = new URL(url).searchParams;
  const ids = query.get("ids");
  let list = items;
  if (ids) {
    const wanted = new Set(ids.split(","));
    list = items.filter(item => wanted.has(item.vod_id));
  } else {
    const keyword = (query.get("wd") || "").replace(/[\s：:]/g, "");
    if (keyword.includes("数码宝贝")) list = items.slice(0, 2);
    else if (keyword.includes("蝙蝠侠黑暗骑士")) list = [items[2]];
    else list = [];
  }
  return { statusCode: 200, data: { code: 1, list } };
}

function load(relative) {
  const context = { console, setTimeout, clearTimeout, URL, Widget: { http: { get: async url => response(url) } } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context;
}

function assert(condition, message) { if (!condition) throw new Error(message); }

(async () => {
  const standalone = load("sources/liangzi/Rex-Liangzi-VOD.js");
  const search = await standalone.searchSource({ keyword: "数码宝贝" });
  assert(search.length === 2, "broad standalone search did not return separate edition entries");
  const linked = await standalone.loadResource({ link: "rexvod://liangzi/2", type: "tv", episode: 7 });
  assert(linked.length === 1 && linked[0].url.endsWith("digimon-cn-6-10.m3u8"),
    "linked standalone entry did not use its own grouped episode resource");
  const base = await standalone.loadResource({ title: "数码宝贝", year: "1999", type: "tv", episode: 1 });
  assert(base.length === 1 && base[0].url.endsWith("digimon-jp-1.m3u8"), "base entry mixed in the Mandarin edition");
  const mandarin = await standalone.loadResource({ title: "数码宝贝国语版", year: "1999", type: "tv", episode: 7 });
  assert(mandarin.length === 1 && mandarin[0].url.endsWith("digimon-cn-6-10.m3u8"),
    "spacing-tolerant Mandarin matching failed");

  const aggregate = load("aggregate/Rex-CineVerse/Rex-CineVerse.js");
  const aggregateSearch = await aggregate.searchCineverse({ keyword: "数码宝贝" });
  assert(aggregateSearch.some(row => row.title === "数码宝贝") && aggregateSearch.some(row => row.title === "数码宝贝 国语版"),
    "aggregate search merged separate edition entries");
  const aggregateBase = await aggregate.loadResource({ title: "数码宝贝", year: "1999", type: "tv", episode: 1 });
  assert(aggregateBase.length && aggregateBase.every(row => row.url.endsWith("digimon-jp-1.m3u8")),
    "aggregate base entry mixed in another edition");
  const aggregateMandarin = await aggregate.loadResource({ title: "数码宝贝国语版", year: "1999", type: "tv", episode: 7 });
  assert(aggregateMandarin.length && aggregateMandarin.every(row => row.url.endsWith("digimon-cn-6-10.m3u8")),
    "aggregate grouped Mandarin episode matching failed");
  const batman = await aggregate.loadResource({ title: "蝙蝠侠黑暗骑士", year: "2008", type: "movie", episode: 1 });
  assert(batman.length === 2, "punctuation-tolerant movie matching did not preserve both in-entry versions");
  console.log("Broad search and source-first playback identity checks passed.");
})().catch(error => { console.error(error); process.exitCode = 1; });


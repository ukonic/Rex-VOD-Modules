"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const movie = {
  vod_id: "3202",
  vod_name: "蝙蝠侠：黑暗骑士",
  vod_year: "2008",
  vod_class: "剧情,动作,科幻,惊悚,犯罪",
  vod_lang: "英语",
  vod_remarks: "HD中字|国语",
  type_name: "动作片",
  type_id: "6",
  type_id_1: "1",
  vod_play_from: "ffm3u8",
  vod_play_url: "HD中字$https://example.com/dark-knight-zh.m3u8#HD国语$https://example.com/dark-knight-cn.m3u8"
};

function load(relative) {
  const context = {
    console, setTimeout, clearTimeout, URL,
    Widget: { http: { get: async () => ({
      statusCode: 200,
      data: { code: 1, page: 1, pagecount: 1, limit: 20, total: 1, list: [movie] }
    }) } }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function verifyFeifan() {
  const context = load("sources/feifan/Rex-Feifan-VOD.js");
  const detail = await context.loadDetail("ffzy://vod/3202");
  assert(detail && detail.episodeItems.length === 1, "Feifan movie should expose one episode item");
  assert(detail.episodeItems[0].title === "正片", "Feifan movie episode should be named 正片");
  const resources = await context.loadResource({
    title: movie.vod_name, year: movie.vod_year, mediaType: "movie", episode: 1, episodeName: "HD中字"
  });
  assert(resources.length === 2, "Feifan movie variants should both be playback resources");
  assert(resources.some(row => row.url.endsWith("dark-knight-zh.m3u8")), "Feifan missing HD中字 resource");
  assert(resources.some(row => row.url.endsWith("dark-knight-cn.m3u8")), "Feifan missing HD国语 resource");
}

async function verifyAggregate() {
  const context = load("aggregate/Rex-CineVerse/Rex-CineVerse.js");
  const detail = await context.loadDetail("cineverse://feifan/3202");
  assert(detail && detail.episodeItems.length === 1, "Aggregate movie should expose one episode item");
  assert(detail.episodeItems[0].title === "正片", "Aggregate movie episode should be named 正片");
  const resources = await context.loadResource({
    title: movie.vod_name, year: movie.vod_year, mediaType: "movie", episode: 1, episodeName: "HD中字"
  });
  const feifan = resources.filter(row => row.name.includes("非凡资源"));
  assert(feifan.length === 2, "Aggregate should preserve both Feifan movie variants");
}

(async () => {
  await verifyFeifan();
  await verifyAggregate();
  console.log("Movie variants stay on one detail page and load as playback resources.");
})().catch(error => { console.error(error); process.exitCode = 1; });

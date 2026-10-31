"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.resolve(__dirname, "..", "aggregate", "Rex-CineVerse", "Rex-CineVerse.js");
const oldAlias = {
  vod_id: "1", vod_name: "披荆斩棘的哥哥", vod_year: "2021", type_name: "大陆综艺", type_id: "25", type_id_1: "3",
  vod_play_from: "m3u8", vod_play_url: "第1期$https://example.com/old.m3u8"
};
const exactTitle = {
  vod_id: "2", vod_name: "披荆斩棘", vod_year: "2023", type_name: "大陆综艺", type_id: "25", type_id_1: "3",
  vod_play_from: "m3u8", vod_play_url: "第1期$https://example.com/exact.m3u8"
};
const firstSeason = {
  vod_id: "3", vod_name: "花儿与少年第一季", vod_year: "2014", type_name: "大陆综艺", type_id: "25", type_id_1: "3",
  vod_play_from: "m3u8", vod_play_url: "第1期$https://example.com/season-1.m3u8"
};
const laterSeason = {
  vod_id: "4", vod_name: "花儿与少年第八季", vod_year: "2026", type_name: "大陆综艺", type_id: "25", type_id_1: "3",
  vod_play_from: "m3u8", vod_play_url: "第1期$https://example.com/season-8.m3u8"
};

const context = {
  console, setTimeout, clearTimeout, URL,
  Widget: { http: { get: async url => {
    const keyword = new URL(url).searchParams.get("wd") || "";
    const list = keyword.includes("披荆斩棘") ? [oldAlias, exactTitle] : [laterSeason, firstSeason];
    return { statusCode: 200, data: { code: 1, list } };
  } } }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const exact = await context.loadResource({ title: "披荆斩棘", type: "tv", episode: 1 });
  assert(exact.length > 0, "exact-title test returned no resources");
  assert(exact.every(row => row.url.endsWith("/exact.m3u8")), "exact title lost to an older alias title");
  const generic = await context.loadResource({ title: "花儿与少年", type: "tv", episode: 1 });
  assert(generic.length > 0, "generic-title test returned no resources");
  assert(generic.every(row => row.url.endsWith("/season-1.m3u8")), "generic title did not retain earliest-series fallback");
  console.log("Exact-title priority and generic-series fallback passed.");
})().catch(error => { console.error(error); process.exitCode = 1; });

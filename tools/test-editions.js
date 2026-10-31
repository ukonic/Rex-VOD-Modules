"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.resolve(__dirname, "..", "aggregate", "Rex-CineVerse", "Rex-CineVerse.js");
const context = { console, setTimeout, clearTimeout, URL, Widget: { http: { get: async () => ({ statusCode: 200, data: { code: 1, list: [] } }) } } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });

const cases = [
  [{ vod_name: "示例电影国语版" }, "国语", "示例电影"],
  [{ vod_name: "示例电影", vod_lang: "粤语" }, "粤语", "示例电影"],
  [{ vod_name: "示例电影（国粤双语）" }, "国粤双语", "示例电影"],
  [{ vod_name: "示例电影（原声版）", vod_lang: "英语 / 汉语普通话" }, "原声", "示例电影"],
  [{ vod_name: "示例电影导演剪辑版" }, "导演剪辑版", "示例电影"],
  [{ vod_name: "示例电影", vod_remarks: "未删减版" }, "未删减版", "示例电影"]
];
for (const [item, edition, base] of cases) {
  if (context.cvEdition(item) !== edition) throw new Error(`edition mismatch: ${JSON.stringify(item)}`);
  if (context.cvBaseTitle(item.vod_name) !== context.cvBaseTitle(base)) throw new Error(`base title mismatch: ${item.vod_name}`);
}
if (context.cvLineEdition({ title: "HD国语" }, { vod_lang: "粤语" }) !== "国语") {
  throw new Error("episode-level edition did not override item language");
}
if (context.cvMediaType({ type_name: "爱情片", vod_class: "剧情" }) !== "movie") {
  throw new Error("aggregate misclassified a drama movie as TV");
}
if (context.cvMediaType({ type_name: "国产剧", vod_class: "剧情" }) !== "tv") {
  throw new Error("aggregate failed to classify an explicit TV category");
}
if (context.cvMediaType({ type_name: "动画电影", vod_class: "动画" }) !== "movie") {
  throw new Error("aggregate misclassified an animated movie as TV");
}

const source = { slug: "sample", name: "示例资源", shortName: "示例" };
function item(language, url) {
  return { vod_id: language, vod_name: "示例电影", vod_lang: language, vod_play_from: "samplem3u8",
    vod_play_url: `正片$${url}`, type_name: "电影", vod_pic: "" };
}
const matches = [
  { source, item: item("国语", "https://example.com/mandarin.m3u8") },
  { source, item: item("粤语", "https://example.com/cantonese.m3u8") }
];
const episodes = context.cvEpisodeItems(matches, {
  id: "cineverse://sample/1", link: "cineverse://sample/1", title: "示例电影",
  coverUrl: "", posterPath: "", mediaType: "movie"
});
if (episodes.length !== 1 || episodes[0].videoUrl || episodes[0].link !== "cineverse://sample/1") {
  throw new Error("edition lines were not grouped into deferred playback context");
}
console.log("Edition parsing and deferred multi-source playback context passed.");

const standaloneFile = path.resolve(__dirname, "..", "sources", "jinying", "Rex-Jinying-VOD.js");
const standaloneItems = [
  { vod_id: "1", vod_name: "蝙蝠侠：黑暗骑士（国语版）", vod_year: "2008", type_name: "动作片", type_id_1: "7",
    vod_play_from: "m3u8", vod_play_url: "正片$https://example.com/batman-mandarin.m3u8" },
  { vod_id: "2", vod_name: "蝙蝠侠：黑暗骑士（原声版）", vod_year: "2008", type_name: "动作片", type_id_1: "7",
    vod_lang: "英语 / 汉语普通话", vod_play_from: "m3u8", vod_play_url: "正片$https://example.com/batman-original.m3u8" }
];
const standalone = { console, setTimeout, clearTimeout, URL, Widget: { http: { get: async url => ({
  statusCode: 200,
  data: { code: 1, list: new URL(url).searchParams.get("wd") === "蝙蝠侠：黑暗骑士" ? standaloneItems : [] }
}) } } };
vm.createContext(standalone);
vm.runInContext(fs.readFileSync(standaloneFile, "utf8"), standalone, { filename: standaloneFile });
if (standalone.sourceMediaType({ type_name: "爱情片", vod_class: "剧情" }) !== "movie") {
  throw new Error("standalone misclassified a drama movie as TV");
}
if (standalone.sourceMediaType({ type_name: "国产剧", vod_class: "剧情" }) !== "tv") {
  throw new Error("standalone failed to classify an explicit TV category");
}
if (standalone.sourceMediaType({ type_name: "动画电影", vod_class: "动画" }) !== "movie") {
  throw new Error("standalone misclassified an animated movie as TV");
}
if (standalone.sourceBaseTitle("千与千寻国语") !== standalone.sourceBaseTitle("千与千寻")) {
  throw new Error("standalone edition suffix was not removed from the base title");
}

(async () => {
  const resources = await standalone.loadResource({
    title: "蝙蝠侠：黑暗骑士", seriesName: "The Dark Knight", year: "2008", mediaType: "movie", episode: 1
  });
  if (resources.length !== 2) throw new Error(`standalone multi-edition playback returned ${resources.length} resources`);
  if (!resources.some(row => /国语/.test(row.name)) || !resources.some(row => /原声/.test(row.name))) {
    throw new Error("standalone multi-edition labels are missing");
  }
  console.log("Standalone multi-edition playback context passed.");
})().catch(error => { console.error(error); process.exitCode = 1; });

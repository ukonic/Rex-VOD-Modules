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

const source = { slug: "sample", name: "示例资源", shortName: "示例" };
function item(language, url) {
  return { vod_id: language, vod_name: "示例电影", vod_lang: language, vod_play_from: "samplem3u8",
    vod_play_url: `正片$${url}`, type_name: "电影", vod_pic: "" };
}
const matches = [
  { source, item: item("国语", "https://example.com/mandarin.m3u8") },
  { source, item: item("粤语", "https://example.com/cantonese.m3u8") }
];
const episodes = context.cvEpisodeItems(matches, { coverUrl: "", posterPath: "" });
if (episodes.length !== 2 || !episodes.some(row => row.title.includes("国语")) || !episodes.some(row => row.title.includes("粤语"))) {
  throw new Error("edition episode lines were not preserved");
}
console.log("Edition parsing and separate playback lines passed.");

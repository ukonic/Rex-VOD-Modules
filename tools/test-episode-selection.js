"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const sample = {
  vod_id: "1", vod_name: "测试剧", vod_year: "2026", type_name: "国产剧", type_id: "13", type_id_1: "2",
  vod_play_from: "ffm3u8", vod_play_url: "第1277集$https://example.com/1277.m3u8#第1集$https://example.com/1.m3u8#第155集$https://example.com/155.m3u8"
};
function load(relative) {
  const context = { console, setTimeout, clearTimeout, URL, Widget: { http: { get: async () => ({ statusCode: 200, data: { code: 1, list: [sample] } }) } } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context;
}

(async () => {
  const feifan = load("sources/feifan/Rex-Feifan-VOD.js");
  const generic = load("sources/liangzi/Rex-Liangzi-VOD.js");
  const aggregate = load("aggregate/Rex-CineVerse/Rex-CineVerse.js");
  const feifan1277 = await feifan.loadResource({ title: "测试剧", type: "tv", episode: 1277 });
  if (!feifan1277.length || !/1277\.m3u8$/.test(feifan1277[0].url)) throw new Error("Feifan did not select unordered episode 1277");
  const generic1277 = await generic.loadResource({ title: "测试剧", type: "tv", episode: 1277 });
  if (!generic1277.length || !/1277\.m3u8$/.test(generic1277[0].url)) throw new Error("Standalone module did not select unordered episode 1277");
  const unordered = [{ title: "第1277集" }, { title: "第1集" }, { title: "第155集" }];
  if (aggregate.cvPickLine(unordered, { episode: 1277 }) !== unordered[0]) throw new Error("Aggregate did not select unordered episode 1277");
  if ((await feifan.loadResource({ title: "测试剧", type: "tv", episode: 1276 })).length) throw new Error("Feifan fell back after missing episode");
  if ((await generic.loadResource({ title: "测试剧", type: "tv", episode: 1276 })).length) throw new Error("Standalone module fell back after missing episode");
  if (aggregate.cvPickLine(unordered, { episode: 1276 }) !== null) throw new Error("Aggregate fell back after missing episode");
  if (aggregate.cvPickLine([{ title: "第1集" }], { episodeName: "第3集" }) !== null) throw new Error("Aggregate fell back after episode-name miss");
  console.log("Exact unordered episodes are selected; missing episodes are skipped.");
})().catch(error => { console.error(error); process.exitCode = 1; });

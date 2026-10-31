"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.resolve(__dirname, "..", "aggregate", "Rex-CineVerse", "Rex-CineVerse.js");
const sample = {
  vod_id: "1", vod_name: "缓存测试剧", vod_year: "2026", type_name: "国产剧", type_id: "13", type_id_1: "2",
  vod_play_from: "m3u8", vod_play_url: "第1集$https://example.com/cache-1.m3u8#第2集$https://example.com/cache-2.m3u8"
};
let calls = 0;
const context = {
  console, setTimeout, clearTimeout, URL,
  Widget: { http: { get: async () => {
    calls += 1;
    return { statusCode: 200, data: { code: 1, list: [sample] } };
  } } }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const detail = await context.loadDetail("cineverse://feifan/1");
  assert(detail && detail.episodeItems.length === 2, "aggregate cache setup detail failed");
  const afterDetail = calls;
  const episode = detail.episodeItems[1];
  const resources = await context.loadResource({ id: episode.id, link: episode.link, title: episode.title, type: episode.mediaType, episode: 2 });
  assert(resources.length > 0, "cached aggregate playback returned no resources");
  assert(calls === afterDetail + 1, `aggregate playback repeated source-wide matching: ${afterDetail} -> ${calls}`);
  const beforeExternal = calls;
  const external = await context.loadResource({ title: sample.vod_name, year: sample.vod_year, type: "tv", episode: 1 });
  assert(external.length > 0, "cached external playback returned no resources");
  assert(calls === beforeExternal, `external playback missed aggregate cache: ${beforeExternal} -> ${calls}`);
  console.log(`Aggregate match cache passed (${afterDetail} initial calls, one linked-detail refresh, zero repeated source scans).`);
})().catch(error => { console.error(error); process.exitCode = 1; });

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const files = {
  feifan: "sources/feifan/Rex-Feifan-VOD.js",
  standalone: "sources/liangzi/Rex-Liangzi-VOD.js",
  aggregate: "aggregate/Rex-CineVerse/Rex-CineVerse.js"
};

function load(relative, handler) {
  const context = { console, setTimeout, clearTimeout, URL, Widget: { http: { get: handler } } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const network = async () => { throw new Error("simulated timeout"); };
  const http500 = async () => ({ statusCode: 500, data: { code: 0, msg: "server error" } });
  const malformed = async () => ({ statusCode: 200, data: "<html>bad gateway</html>" });

  for (const [name, relative] of Object.entries(files)) {
    const context = load(relative, network);
    const link = name === "aggregate" ? "cineverse://feifan/1" :
      name === "standalone" ? "rexvod://liangzi/1" :
        "https://api.ffzyapi.com/api.php/provide/vod/from/ffm3u8/?ac=detail&ids=1";
    const detail = await context.loadDetail(link);
    assert(detail === null, `${name}: network failure should return null detail`);
    const resources = await context.loadResource({ title: "测试剧", type: "tv", episode: 1 }).catch(() => []);
    assert(Array.isArray(resources), `${name}: resource failure should remain isolated`);
  }

  for (const [label, handler] of [
    ["HTTP", http500],
    ["JSON", malformed]
  ]) {
    const standalone = load(files.standalone, handler);
    assert((await standalone.loadSourceHome({ page: 1 })).length === 0, `standalone ${label}: home failure was not isolated`);
    assert((await standalone.searchSource({ keyword: "测试" })).length === 0, `standalone ${label}: search failure was not isolated`);
    const feifan = load(files.feifan, handler);
    assert((await feifan.loadFeifanList({ page: 1 })).length === 0, `feifan ${label}: home failure was not isolated`);
    assert((await feifan.searchFeifan({ keyword: "测试" })).length === 0, `feifan ${label}: search failure was not isolated`);
  }

  const blocked = {
    vod_id: "1", vod_name: "违规测试", type_name: "伦理片", type_id: "34", type_id_1: "1",
    vod_play_from: "ffm3u8", vod_play_url: "正片$https://example.com/blocked.m3u8"
  };
  const blockedHandler = async () => ({ statusCode: 200, data: { code: 1, list: [blocked] } });
  assert((await load(files.feifan, blockedHandler).searchFeifan({ keyword: "违规测试" })).length === 0, "Feifan did not filter blocked content");
  assert((await load(files.standalone, blockedHandler).searchSource({ keyword: "违规测试" })).length === 0, "Standalone did not filter blocked content");
  assert((await load(files.aggregate, blockedHandler).searchCineverse({ keyword: "违规测试" })).length === 0, "Aggregate did not filter blocked content");

  const invalid = {
    vod_id: "2", vod_name: "无效地址", type_name: "国产剧", type_id: "13", type_id_1: "2",
    vod_play_from: "m3u8", vod_play_url: "第1集$javascript:alert(1)#第2集$https://example.com/video.mp4"
  };
  const invalidHandler = async () => ({ statusCode: 200, data: { code: 1, list: [invalid] } });
  assert((await load(files.feifan, invalidHandler).loadResource({ title: "无效地址", type: "tv", episode: 1 })).length === 0, "Feifan accepted invalid playback URL");
  assert((await load(files.standalone, invalidHandler).loadResource({ title: "无效地址", type: "tv", episode: 1 })).length === 0, "Standalone accepted invalid playback URL");
  assert((await load(files.aggregate, invalidHandler).loadResource({ title: "无效地址", type: "tv", episode: 1 })).length === 0, "Aggregate accepted invalid playback URL");

  console.log("Network, HTTP, JSON, blocked-content, and invalid-URL handling passed.");
})().catch(error => { console.error(error); process.exitCode = 1; });

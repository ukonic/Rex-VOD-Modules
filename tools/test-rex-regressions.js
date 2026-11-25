"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { searchId } = require("./module-release");
const registry = require("../registry.json");

const aggregate = "aggregate/Rex-CineVerse/Rex-CineVerse.js";
const seriesName = "年度剧集样本";

function record(id, name, { year = "2025", movie = false, episode = 1, host = "example.test" } = {}) {
  return {
    vod_id: String(id), vod_name: name, vod_year: year,
    vod_pic: "https://example.test/poster.jpg",
    type_id: movie ? "11" : "13", type_id_1: movie ? "1" : "2",
    type_name: movie ? "剧情片" : "国产剧",
    vod_play_from: "ffm3u8",
    vod_play_url: `${movie ? "正片" : `第${episode}集`}$https://${host}/${id}.m3u8`
  };
}

function open(file, callback) {
  const get = async url => ({ statusCode: 200, data: { code: 1, list: await callback(new URL(url)) } });
  const request = async ({ url, method, timeout }) => {
    assert.equal(method, "GET");
    assert.equal(timeout, 8);
    return get(url);
  };
  const context = vm.createContext({ Widget: { http: { get, request } }, console });
  vm.runInContext(fs.readFileSync(path.resolve(__dirname, "..", file), "utf8"), context, { filename: file });
  return context;
}

async function checkEntries() {
  for (const source of [...registry, { id: "aggregate", module: aggregate }]) {
    const requests = new Set();
    const context = open(source.module, url => {
      if (url.searchParams.has("ids")) return [record(99, "错误条目")];
      const page = url.searchParams.get("pg");
      requests.add(page);
      return [record(page, "短词测试记录" + page)];
    });
    const search = context.WidgetMetadata.search;
    assert.equal(search.id, searchId(search.title));
    assert.equal((await context.loadDetail("invalid")).length, 0);
    const link = source.id === "aggregate" ? "cineverse://zy360/1" : `rexvod://${source.id}/1`;
    assert.equal((await context.loadDetail(link)).length, 0, source.id + " returned a different ID");
    const p1 = await context[search.functionName]({ keyword: "星海", page: "1" });
    assert.deepEqual([...requests].sort(), ["1", "2"]);
    requests.clear();
    const p2 = await context[search.functionName]({ keyword: "星海", page: "2" });
    assert.deepEqual([...requests].sort(), ["3", "4"]);
    assert.ok(p2.length > 0 && p2.every(item => p1.every(previous => previous.id !== item.id)));
  }
}

async function checkPlayback() {
  const title = "跨年份同名电影样本";
  const wrong = record(1, title, { movie: true, year: "2010" });
  const correct = record(2, title, { movie: true, year: "2021" });
  const fake = { ...record(3, title, { movie: true, year: "2021" }),
    vod_play_url: "正片$https://example.test/watch?next=https://example.test/not-a-playlist.m3u8" };
  for (const file of [registry[0].module, registry[1].module, aggregate]) {
    const context = open(file, () => [wrong, fake, correct]);
    const result = await context.loadResource({ seriesName: title, type: "movie", airDate: "2021-04-01" });
    assert.deepEqual(Array.from(result, item => item.url), ["https://example.test/2.m3u8"], file);
  }

  const core = registry.filter(source => source.tier === "S").slice(0, 3);
  const backup = registry.find(source => source.tier === "A");
  const probes = new Map([...core, backup].map(source => [new URL(source.api).host, source]));
  const calls = new Set();
  const context = open(aggregate, url => {
    calls.add(url.host);
    const source = probes.get(url.host);
    if (!source) return [];
    return [record(1, seriesName, { episode: source === backup ? 2 : 1, host: url.host })];
  });
  const result = await context.loadResource({ seriesName, type: "tv", episode: "2", sourceStrategy: "auto" });
  assert.ok(calls.has(new URL(backup.api).host));
  assert.deepEqual(Array.from(result, item => item.url), [`https://${new URL(backup.api).host}/1.m3u8`]);
}

async function checkEndpointCompatibility() {
  for (const source of registry.filter(item => ["iqiyi", "xinlang"].includes(item.id))) {
    const http = source.api.replace(/^https:/, "http:");
    const context = open(source.module, url => {
      assert.equal(url.protocol, "https:");
      return [record(1, seriesName)];
    });
    assert.equal((await context.loadDetail(http + "?ac=detail&ids=1")).title, seriesName);
  }
  const source = registry.find(row => row.id === "zy360");
  const testedHosts = [new URL(source.api).host, new URL(source.fallbackApi).host];
  for (const file of [source.module, aggregate]) {
    const calls = [];
    const context = open(file, url => {
      calls.push(url.host);
      if (url.host === testedHosts[0]) throw new Error("primary unreachable");
      return [record(1, seriesName)];
    });
    const link = file === aggregate ? "cineverse://zy360/1" : "rexvod://zy360/1";
    assert.equal((await context.loadDetail(link)).title, seriesName);
    assert.deepEqual(calls, testedHosts);
  }
  const calls = [];
  const unavailable = open(aggregate, url => {
    calls.push(url.host);
    throw new Error("unreachable");
  });
  const result = await unavailable.loadResource({ link: "cineverse://zy360/1", seriesName, type: "tv", episode: "1" });
  assert.equal(result.length, 0);
  assert.deepEqual(calls, testedHosts, "R tier must not fall through to aggregate playback");
}

(async () => {
  await checkEntries();
  await checkPlayback();
  await checkEndpointCompatibility();
  console.log("41/41 pagination and detail identity checks passed; playback strategy and endpoint compatibility passed.");
})().catch(error => { console.error(error); process.exitCode = 1; });

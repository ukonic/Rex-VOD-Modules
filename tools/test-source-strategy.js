"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const generated = require("./generated-sources.json");

const file = path.resolve(__dirname, "..", "aggregate", "Rex-CineVerse", "Rex-CineVerse.js");
const tiers = Object.fromEntries(["S", "A", "B", "C", "D", "R"].map(tier => [tier, generated.filter(source => source.tier === tier)]));
const state = { matches: { S: 1, A: 1, B: 1, C: 0, D: 1, R: 1 }, calls: [] };

function sourceForUrl(url) {
  return generated.find(source => [source.searchApi, source.api].filter(Boolean).some(api => url.startsWith(api)));
}

function responseFor(source) {
  const tierRows = tiers[source.tier] || [];
  const tierIndex = tierRows.findIndex(item => item.slug === source.slug);
  const shouldMatch = tierIndex >= 0 && tierIndex < (state.matches[source.tier] || 0);
  return {
    statusCode: 200,
    data: {
      code: 1,
      list: shouldMatch ? [{
        vod_id: source.slug,
        vod_name: "自动分层测试电影",
        vod_year: "2026",
        type_name: "电影片",
        vod_play_from: "m3u8",
        vod_play_url: `正片$https://${source.slug}.example/video.m3u8`
      }] : []
    }
  };
}

const context = {
  console, setTimeout, clearTimeout, URL,
  Widget: { http: { get: async url => {
    const source = sourceForUrl(url);
    if (!source) throw new Error(`Unknown source URL: ${url}`);
    state.calls.push(source.slug);
    return responseFor(source);
  } } }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function calledTier(tier) {
  const slugs = new Set((tiers[tier] || []).map(source => source.slug));
  return state.calls.some(slug => slugs.has(slug));
}
async function run(strategy, target, matches) {
  state.matches = Object.assign({ S: 0, A: 0, B: 0, C: 0, D: 0, R: 0 }, matches || {});
  state.calls = [];
  context.CV_MATCH_CACHE = {};
  return context.loadResource({
    title: "自动分层测试电影", type: "movie", year: "2026",
    sourceStrategy: strategy, sourceTarget: target
  });
}

(async () => {
  assert(tiers.S.map(source => source.slug).join(",") === "feifan,liangzi,zuida,wujin,modu,dytt,baofeng,ruyi,youku",
    "S tier ordering is incorrect");
  assert(tiers.A.slice(-2).map(source => source.slug).join(",") === "guangsu,hongniu",
    "Guangsu and Hongniu are not at the end of A tier");
  assert(tiers.R.map(source => source.slug).join(",") === "zy360,zy1080", "R tier sources are incorrect");
  assert(context.CINEVERSE_SOURCES.length === 38 && !context.cvSource("zy360") && !context.cvSource("zy1080"),
    "R tier sources were included in the aggregate runtime");

  let resources = await run("complete", "3", { S: 1, A: 1, B: 1, C: 1, D: 1, R: 1 });
  assert(resources.length === 5, "Complete strategy did not search S through D tiers");
  assert(calledTier("S") && calledTier("A") && calledTier("B") && calledTier("C") && calledTier("D"),
    "Complete strategy skipped an included tier");
  assert(!calledTier("R"), "Complete strategy queried an R-tier source");

  resources = await run("core", "3", { S: 2, A: 2, B: 2, D: 1 });
  assert(resources.length === 2, "Core strategy did not return only S-tier matches");
  assert(calledTier("S") && !calledTier("A") && !calledTier("B") && !calledTier("D") && !calledTier("R"),
    "Core strategy queried a non-S tier");

  resources = await run("auto", "2", { S: 1, A: 1, B: 1, D: 1 });
  assert(resources.length === 2, "Auto strategy did not stop after reaching the target in A tier");
  assert(calledTier("S") && calledTier("A") && !calledTier("B") && !calledTier("D") && !calledTier("R"),
    "Auto strategy did not follow S to A staging");

  resources = await run("auto", "3", { S: 1, A: 1, B: 1, D: 1 });
  assert(resources.length === 3, "Auto strategy did not continue into B+C to reach the target");
  assert(calledTier("S") && calledTier("A") && calledTier("B") && calledTier("C") && !calledTier("D") && !calledTier("R"),
    "Auto strategy did not follow S to A to B+C staging");

  resources = await run("auto", "invalid", { S: 3, A: 1, B: 1 });
  assert(resources.length === 3 && !calledTier("A"), "Invalid target did not fall back to default 3");
  assert(context.cvSourceTarget({ sourceTarget: "0" }) === 3, "Zero target did not use default 3");
  assert(context.cvSourceTarget({ sourceTarget: "99" }) === 20, "Target was not capped at 20");

  state.matches = { S: 1, A: 1, B: 1, C: 1, D: 1, R: 1 };
  state.calls = [];
  await context.searchCineverse({ keyword: "自动分层测试电影", page: 1 });
  assert(!calledTier("D") && !calledTier("R"), "Aggregate search queried a complete-only or R-tier source");

  const optionTitles = context.cvSourceOptions().map(item => item.title);
  assert(optionTitles.some(title => title.indexOf("优先 · ") === 0) && optionTitles.some(title => title.indexOf("备用 · ") === 0)
    && optionTitles.some(title => title.indexOf("补充 · ") === 0) && optionTitles.some(title => title.indexOf("完整专用 · ") === 0)
    && !optionTitles.some(title => /360资源|1080资源/.test(title)),
    "Source library does not show all tier roles");

  const strategy = context.WidgetMetadata.globalParams.find(item => item.name === "sourceStrategy");
  const target = context.WidgetMetadata.globalParams.find(item => item.name === "sourceTarget");
  assert(strategy && strategy.value === "auto" && strategy.enumOptions.length === 3,
    "Source strategy setting is missing or has the wrong default");
  assert(target && target.value === "3" && /仅自动分层生效/.test(target.title) && /播放源策略选择“自动分层”时生效/.test(target.description)
    && /1–20/.test(target.description) && /不是播放线路数量/.test(target.description)
    && /完整聚合和仅核心站会忽略此数字/.test(target.description),
    "Source target setting or explanation is incomplete");
  console.log("Source strategy modes passed: complete 38 including D, core S, auto S to A to B+C, R excluded.");
})().catch(error => { console.error(error); process.exitCode = 1; });

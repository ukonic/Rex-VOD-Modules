"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const generated = require("./generated-sources.json");

const file = path.resolve(__dirname, "..", "aggregate", "Rex-CineVerse", "Rex-CineVerse.js");
const priority = generated.filter(source => source.tier === "S" || source.tier === "A");
const fallback = generated.filter(source => source.tier !== "S" && source.tier !== "A");
const state = { priorityMatches: 1, calls: [] };

function sourceForUrl(url) {
  return generated.find(source => [source.searchApi, source.api].filter(Boolean).some(api => url.startsWith(api)));
}

function responseFor(source) {
  const priorityIndex = priority.findIndex(item => item.slug === source.slug);
  const shouldMatch = priorityIndex >= 0 ? priorityIndex < state.priorityMatches : source.slug === fallback[0].slug;
  return {
    statusCode: 200,
    data: {
      code: 1,
      list: shouldMatch ? [{
        vod_id: source.slug,
        vod_name: "自动分级测试电影",
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
function calledFallback() {
  const fallbackSlugs = new Set(fallback.map(source => source.slug));
  return state.calls.some(slug => fallbackSlugs.has(slug));
}
async function run(strategy, priorityMatches) {
  state.priorityMatches = priorityMatches;
  state.calls = [];
  context.CV_MATCH_CACHE = {};
  return context.loadResource({ title: "自动分级测试电影", type: "movie", year: "2026", sourceStrategy: strategy });
}

(async () => {
  let resources = await run("complete", 1);
  assert(resources.length === 2, "Complete strategy did not keep priority and fallback resources");
  assert(calledFallback(), "Complete strategy did not search fallback sources");

  resources = await run("priority", 1);
  assert(resources.length === 1, "Priority strategy returned a fallback resource");
  assert(!calledFallback(), "Priority strategy queried fallback sources");

  resources = await run("auto", 1);
  assert(resources.length === 2, "Auto strategy did not degrade when priority matches were insufficient");
  assert(calledFallback(), "Auto strategy did not query fallback sources after insufficient matches");

  resources = await run("auto", 3);
  assert(resources.length === 3, "Auto strategy did not keep the three priority matches");
  assert(!calledFallback(), "Auto strategy queried fallback sources despite enough priority matches");

  const setting = context.WidgetMetadata.globalParams.find(item => item.name === "sourceStrategy");
  assert(setting && setting.value === "complete" && setting.enumOptions.length === 3,
    "Source strategy global setting is missing or has the wrong default");
  console.log("Source strategy modes passed: complete, priority, auto fallback, auto no-fallback.");
})().catch(error => { console.error(error); process.exitCode = 1; });

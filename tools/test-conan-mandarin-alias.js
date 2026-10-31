"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const generated = require("./generated-sources.json");

const file = path.resolve(__dirname, "..", "aggregate", "Rex-CineVerse", "Rex-CineVerse.js");

function sourceForUrl(url) {
  return generated.find(source => [source.searchApi, source.api].filter(Boolean).some(api => url.startsWith(api)));
}

function item(id, name, suffix) {
  return {
    vod_id: id,
    vod_name: name,
    vod_year: "1996",
    type_name: "日韩动漫",
    vod_play_from: "m3u8",
    vod_play_url: `第01集$https://example.com/${suffix}.m3u8`
  };
}

const sourceItems = {
  feifan: [
    item("ff-base", "名侦探柯南", "feifan-base")
  ],
  liangzi: [
    item("lz-base", "名侦探柯南", "liangzi-base"),
    item("lz-cn", "名侦探柯南国语", "liangzi-cn"),
    item("lz-jp", "名侦探柯南日语版", "liangzi-jp")
  ],
  ruyi: [item("ry-cn", "名侦探柯南（中配）", "ruyi-cn")],
  youku: [item("yk-cn", "名侦探柯南中文配音版", "youku-cn")],
  guangsu: [item("gs-cn", "名侦探柯南（中配）", "guangsu-cn")],
  hongniu: [item("hn-cn", "名侦探柯南中文配音版", "hongniu-cn")]
};

const context = {
  console, setTimeout, clearTimeout, URL,
  Widget: { http: { get: async url => {
    const source = sourceForUrl(url);
    return { statusCode: 200, data: { code: 1, list: source ? (sourceItems[source.slug] || []) : [] } };
  } } }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const params = { year: "1996", type: "tv", sourceStrategy: "core" };
  const mandarin = await context.cvFindPlaybackMatches("名侦探柯南（中配）", params);
  const slugs = new Set(mandarin.map(row => row.source.slug));
  assert(slugs.has("feifan"), "Core search dropped Feifan's Mandarin entry");
  assert(slugs.has("ruyi") && slugs.has("youku"), "Core search dropped equivalent Mandarin aliases");
  assert(!slugs.has("guangsu") && !slugs.has("hongniu"), "Core search queried A-tier tail sources");
  const feifan = mandarin.find(row => row.source.slug === "feifan");
  const liangzi = mandarin.find(row => row.source.slug === "liangzi");
  assert(feifan && feifan.item.vod_name === "名侦探柯南",
    "Core search did not keep Feifan's source-local fallback");
  assert(liangzi && liangzi.item.vod_name === "名侦探柯南国语",
    "Core search did not prefer a source-local Mandarin entry over its fallback");
  assert(mandarin.every(row => {
    const edition = context.cvTitleEdition(row.item.vod_name);
    return !edition || edition === "国语";
  }), "Mandarin alias search mixed a conflicting edition");

  context.CV_MATCH_CACHE = {};
  const base = await context.cvFindPlaybackMatches("名侦探柯南", params);
  assert(base.length === 2 && base.every(row => row.item.vod_name === "名侦探柯南"),
    "Base Conan search mixed a Mandarin or Japanese edition");

  context.CV_MATCH_CACHE = {};
  const japanese = await context.cvFindPlaybackMatches("名侦探柯南日语版", params);
  const japaneseBySource = Object.fromEntries(japanese.map(row => [row.source.slug, row.item.vod_name]));
  assert(japaneseBySource.liangzi === "名侦探柯南日语版" && japaneseBySource.feifan === "名侦探柯南",
    "Japanese Conan search did not prefer the matching edition and retain source-local fallback");

  console.log("Conan edition searches keep each core source's best match and retain safe source-local fallbacks.");
})().catch(error => { console.error(error); process.exitCode = 1; });

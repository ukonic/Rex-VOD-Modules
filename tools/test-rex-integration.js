"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const registry = require(path.resolve(__dirname, "..", "registry.json"));

const root = path.resolve(__dirname, "..");
const sample = {
  vod_id: "9001",
  vod_name: "Rex接口测试剧",
  vod_year: "2026",
  vod_lang: "国语",
  type_name: "国产剧",
  type_id: "13",
  type_id_1: "2",
  vod_play_from: "ffm3u8",
  vod_play_url: "第1集$https://source.example/1.m3u8#第2集$https://source.example/2.m3u8"
};

function load(file) {
  const context = {
    console, setTimeout, clearTimeout, URL,
    Widget: { http: { get: async () => ({
      statusCode: 200,
      data: { code: 1, page: 1, pagecount: 1, limit: 20, total: 1, list: [sample] }
    }) } }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return context;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function verify(file) {
  const relative = path.relative(root, file);
  const context = load(file);
  const metadata = context.WidgetMetadata;
  const stream = metadata.modules.find(module => module.id === "loadResource");
  assert(stream && stream.type === "stream" && stream.functionName === "loadResource", `${relative}: missing Rex stream contract`);
  assert(metadata.search && typeof context[metadata.search.functionName] === "function", `${relative}: missing Rex search contract`);
  assert(typeof context.loadDetail === "function", `${relative}: missing Rex detail contract`);

  const searchItems = await context[metadata.search.functionName]({ keyword: sample.vod_name, page: 1 });
  assert(searchItems.length, `${relative}: Rex search returned no items`);
  const searchItem = searchItems[0];
  assert(searchItem.id && searchItem.link && searchItem.type, `${relative}: search item lacks id/link/type`);

  const detail = await context.loadDetail(searchItem.link);
  assert(detail && detail.id === searchItem.id && detail.link === searchItem.link && detail.type === searchItem.type,
    `${relative}: search and detail identity are inconsistent`);
  assert(!detail.videoUrl, `${relative}: detail bypasses Rex loadResource with fixed videoUrl`);
  assert(Array.isArray(detail.episodeItems) && detail.episodeItems.length >= 2, `${relative}: detail lacks episodeItems`);
  assert(detail.episodeItems.every(item => item.link && item.episode && !item.videoUrl),
    `${relative}: episode items do not defer playback to Rex loadResource`);
  assert(new Set(detail.episodeItems.map(item => item.id)).size === detail.episodeItems.length,
    `${relative}: episode IDs are not unique enough for Continue Watching`);

  const incomingUrl = "https://third-party.example/original.m3u8";
  const externalResources = await context.loadResource({
    tmdbId: "12345",
    imdbId: "tt12345",
    id: "tv.12345",
    type: "tv",
    title: sample.vod_name,
    seriesName: "Wrong External Series Name",
    year: sample.vod_year,
    season: 1,
    episode: 2,
    episodeName: "外部数据库集名",
    videoUrl: incomingUrl
  });
  assert(externalResources.length, `${relative}: Rex external playback context returned no source`);
  assert(externalResources.every(resource => /\.m3u8(?:[?#]|$)/i.test(resource.url)), `${relative}: returned non-M3U8 source`);
  assert(externalResources.every(resource => resource.url !== incomingUrl), `${relative}: echoed an unrelated incoming videoUrl`);
  assert(externalResources.every(resource => /\/2\.m3u8$/.test(resource.url)), `${relative}: did not honor Rex episode number`);

  const episode = detail.episodeItems.find(item => item.episode === 2);
  const resumedDetail = await context.loadDetail(episode.id);
  assert(resumedDetail && resumedDetail.id === detail.id && resumedDetail.link === detail.link,
    `${relative}: Continue Watching episode ID did not reopen the parent detail page`);
  const resumedEpisode = resumedDetail.episodeItems.find(item => item.episode === 2);
  assert(resumedEpisode && resumedEpisode.id === episode.id,
    `${relative}: Continue Watching episode identity changed after reopening detail`);
  const detailResources = await context.loadResource({
    id: episode.id,
    link: episode.link,
    title: episode.title,
    type: episode.mediaType,
    episode: episode.episode
  });
  assert(detailResources.length && detailResources.every(resource => /\/2\.m3u8$/.test(resource.url)),
    `${relative}: search-detail playback did not route through Rex loadResource`);
}

(async () => {
  const files = registry.map(row => path.join(root, ...row.module.split("/")))
    .concat(path.join(root, "aggregate", "Rex-CineVerse", "Rex-CineVerse.js"));
  for (const file of files) await verify(file);
  console.log(`${files.length}/${files.length} modules passed Rex search/detail/stream and Continue Watching checks.`);
})().catch(error => { console.error(error); process.exitCode = 1; });

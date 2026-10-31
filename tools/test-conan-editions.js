"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function load(relative) {
  const context = {
    console, setTimeout, clearTimeout, URL,
    Widget: { http: { get: async (url, options) => {
      const response = await fetch(url, {
        headers: (options && options.headers) || {},
        signal: AbortSignal.timeout(20000)
      });
      const body = await response.text();
      let data = body;
      try { data = JSON.parse(body); } catch (_) {}
      return { statusCode: response.status, data };
    } } }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context;
}

function assertM3u8(resources, label) {
  if (!resources.length) throw new Error(`${label}: no playback resources`);
  if (!resources.every(row => /\.m3u8(?:[?#]|$)/i.test(row.url))) throw new Error(`${label}: non-M3U8 resource`);
}

(async () => {
  const feifan = load("sources/feifan/Rex-Feifan-VOD.js");
  const aggregate = load("aggregate/Rex-CineVerse/Rex-CineVerse.js");

  const incomingUrl = "https://example.com/not-feifan.m3u8";
  const feifanBase = await feifan.loadResource({
    title: "名侦探柯南", year: "1996", type: "tv", episode: 1277,
    episodeName: "来自第三方数据库的集名", videoUrl: incomingUrl
  });
  assertM3u8(feifanBase, "Feifan Conan base entry");
  if (feifanBase.some(row => row.url === incomingUrl)) throw new Error("Feifan reused the incoming third-party videoUrl");
  if (feifanBase.some(row => /国语/.test(row.name))) throw new Error("Feifan mixed the separate Mandarin entry into the base title");
  if (!feifanBase.every(row => /1277/.test(row.name))) throw new Error("Feifan selected the wrong Conan episode 1277");
  const feifanMandarin = await feifan.loadResource({ title: "名侦探柯南国语", year: "1996", type: "tv", episode: 1277 });
  assertM3u8(feifanMandarin, "Feifan Conan Mandarin entry");
  if (!feifanMandarin.every(row => /国语/.test(row.name))) throw new Error("Feifan Mandarin title matched another entry");

  const feifanDetail = await feifan.loadDetail("https://api.ffzyapi.com/api.php/provide/vod/from/ffm3u8/?ac=detail&ids=40057");
  if (!feifanDetail || feifanDetail.videoUrl) throw new Error("Feifan detail fixed a direct videoUrl instead of deferring to loadResource");
  if (!feifanDetail.episodeItems.length || feifanDetail.episodeItems.some(row => row.videoUrl)) throw new Error("Feifan episode items contain fixed videoUrl values");
  const feifanEpisode = feifanDetail.episodeItems.find(row => row.episode === 1277);
  if (!feifanEpisode) throw new Error("Feifan detail does not expose episode 1277");
  const feifanFromDetail = await feifan.loadResource({
    id: feifanEpisode.id, link: feifanEpisode.link, title: feifanEpisode.title,
    episode: feifanEpisode.episode, type: feifanEpisode.mediaType
  });
  assertM3u8(feifanFromDetail, "Feifan search-detail playback");
  if (feifanFromDetail.some(row => /国语/.test(row.name))) throw new Error("Feifan linked detail mixed in another edition");

  const editions = await aggregate.loadResource({ title: "名侦探柯南", year: "1996", type: "tv", episode: 1 });
  assertM3u8(editions, "Aggregate Conan editions");

  const latest = await aggregate.loadResource({ title: "名侦探柯南", year: "1996", type: "tv", episode: 1277 });
  assertM3u8(latest, "Aggregate Conan episode 1277");
  const wrong = latest.filter(row => {
    const episodeTitle = String(row.name || "").split(" · ").pop();
    return aggregate.cvEpisodeNumber(episodeTitle) !== 1277;
  });
  if (wrong.length) throw new Error(`Aggregate returned wrong episodes: ${wrong.map(row => row.name).join(" | ")}`);

  const aggregateDetail = await aggregate.loadDetail("cineverse://feifan/40057");
  if (!aggregateDetail || aggregateDetail.videoUrl) throw new Error("Aggregate detail fixed a direct videoUrl instead of deferring to loadResource");
  if (!aggregateDetail.episodeItems.length || aggregateDetail.episodeItems.some(row => row.videoUrl)) throw new Error("Aggregate episode items contain fixed videoUrl values");
  const aggregateEpisode = aggregateDetail.episodeItems.find(row => row.episode === 1277);
  if (!aggregateEpisode) throw new Error("Aggregate detail does not expose episode 1277");
  const aggregateFromDetail = await aggregate.loadResource({
    id: aggregateEpisode.id, link: aggregateEpisode.link, title: aggregateEpisode.title,
    episode: aggregateEpisode.episode, type: aggregateEpisode.mediaType,
    videoUrl: incomingUrl
  });
  assertM3u8(aggregateFromDetail, "Aggregate search-detail playback");
  if (aggregateFromDetail.some(row => row.url === incomingUrl)) throw new Error("Aggregate reused the incoming third-party videoUrl");
  if (aggregateFromDetail.length < 2) throw new Error("Aggregate search detail returned only one playback source");

  console.log("Feifan base episode 1277:", feifanBase.length, feifanBase.map(row => row.name));
  console.log("Feifan Mandarin episode 1277:", feifanMandarin.length, feifanMandarin.map(row => row.name));
  console.log("Feifan search detail:", feifanFromDetail.length, feifanFromDetail.map(row => row.name));
  console.log("Aggregate episode 1:", editions.length, "same-title resources");
  console.log("Aggregate episode 1277:", latest.length, latest.map(row => row.name));
  console.log("Aggregate search detail:", aggregateFromDetail.length, "resources");
})().catch(error => { console.error(error); process.exitCode = 1; });

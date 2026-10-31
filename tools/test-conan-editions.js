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

  const japanese = await feifan.loadResource({ title: "名侦探柯南", year: "1996", type: "tv", episode: 1 });
  const mandarin = await feifan.loadResource({ title: "名侦探柯南国语", year: "1996", type: "tv", episode: 1 });
  const japanese1277 = await feifan.loadResource({ title: "名侦探柯南", year: "1996", type: "tv", episode: 1277 });
  const mandarin1277 = await feifan.loadResource({ title: "名侦探柯南国语", year: "1996", type: "tv", episode: 1277 });
  assertM3u8(japanese, "Feifan Japanese Conan");
  assertM3u8(mandarin, "Feifan Mandarin Conan");
  assertM3u8(japanese1277, "Feifan Japanese Conan episode 1277");
  assertM3u8(mandarin1277, "Feifan Mandarin Conan episode 1277");
  if (japanese[0].url === mandarin[0].url) throw new Error("Feifan Conan editions collapsed into one resource");
  if (!/1277/.test(japanese1277[0].name) || !/1277/.test(mandarin1277[0].name)) throw new Error("Feifan selected the wrong Conan episode 1277");

  const editions = await aggregate.loadResource({ title: "名侦探柯南", year: "1996", type: "tv", episode: 1 });
  assertM3u8(editions, "Aggregate Conan editions");
  if (!editions.some(row => /国语|普通话|国配/.test(row.name + row.description))) throw new Error("Aggregate Conan lost Mandarin edition");
  if (!editions.some(row => /日语|原声/.test(row.name + row.description))) throw new Error("Aggregate Conan lost Japanese edition");

  const latest = await aggregate.loadResource({ title: "名侦探柯南", year: "1996", type: "tv", episode: 1277 });
  assertM3u8(latest, "Aggregate Conan episode 1277");
  const wrong = latest.filter(row => {
    const episodeTitle = String(row.name || "").split(" · ").pop();
    return aggregate.cvEpisodeNumber(episodeTitle) !== 1277;
  });
  if (wrong.length) throw new Error(`Aggregate returned wrong episodes: ${wrong.map(row => row.name).join(" | ")}`);

  console.log("Feifan editions:", japanese[0].name, mandarin[0].name, "episode 1277:", japanese1277[0].name, mandarin1277[0].name);
  console.log("Aggregate episode 1:", editions.length, "resources with Japanese and Mandarin editions");
  console.log("Aggregate episode 1277:", latest.length, latest.map(row => row.name));
})().catch(error => { console.error(error); process.exitCode = 1; });

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const generated = require("./generated-sources.json");

const root = path.resolve(__dirname, "..");
const aggregateFile = path.join(root, "aggregate", "Rex-CineVerse", "Rex-CineVerse.js");

const allCases = [
  { title: "蝙蝠侠：黑暗骑士", seriesName: "The Dark Knight", year: "2008", mediaType: "movie", episode: 1 },
  { title: "盗梦空间", seriesName: "Inception", year: "2010", mediaType: "movie", episode: 1 },
  { title: "泰坦尼克号", seriesName: "Titanic", year: "1997", mediaType: "movie", episode: 1 },
  { title: "千与千寻", seriesName: "Spirited Away", year: "2001", mediaType: "movie", episode: 1 },
  { title: "无间道", seriesName: "Infernal Affairs", year: "2002", mediaType: "movie", episode: 1 },
  { title: "流浪地球2", seriesName: "The Wandering Earth II", year: "2023", mediaType: "movie", episode: 1 },
  { title: "甄嬛传", seriesName: "Empresses in the Palace", year: "2011", mediaType: "tv", episode: 1 },
  { title: "权力的游戏第一季", seriesName: "Game of Thrones", year: "2011", season: 1, mediaType: "tv", episode: 1 },
  { title: "名侦探柯南", seriesName: "Detective Conan", year: "1996", mediaType: "tv", episode: 1277 },
  { title: "花儿与少年第八季", seriesName: "Divas Hit the Road", year: "2026", season: 8, mediaType: "tv", episode: 1 }
];
const filters = process.argv.slice(2);
const cases = filters.length ? allCases.filter(item => filters.some(filter => item.title.includes(filter))) : allCases;

function load(relative) {
  const file = path.join(root, relative);
  const context = {
    console, setTimeout, clearTimeout, URL,
    Widget: { http: { get: async (url, options) => {
      const response = await fetch(url, {
        headers: (options && options.headers) || {},
        signal: AbortSignal.timeout(20000)
      });
      const text = await response.text();
      let data = text;
      try { data = JSON.parse(text); } catch (_) {}
      return { statusCode: response.status, data };
    } } }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return context;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function modulePath(slug) {
  const source = generated.find(row => row.slug === slug);
  return source ? path.join("sources", slug, source.file) : "";
}

(async () => {
  const aggregate = load(path.relative(root, aggregateFile));
  const results = [];

  for (const item of cases) {
    const started = Date.now();
    const keywords = aggregate.cvPlaybackKeywords(item, null);
    let keyword = "";
    let matches = [];
    for (const candidate of keywords) {
      const found = await aggregate.cvFindMatches(candidate, item);
      if (found.length) {
        keyword = candidate;
        matches = found;
        break;
      }
    }
    const resources = await aggregate.loadResource({ ...item });
    assert(resources.length > 0, `${item.title}: aggregate returned no resources`);
    assert(resources.every(row => /\.m3u8(?:[?#]|$)/i.test(row.url)), `${item.title}: aggregate returned a non-M3U8 URL`);
    if (item.episode > 1) {
      assert(resources.every(row => aggregate.cvEpisodeNumber(String(row.name).split(" · ").pop()) === item.episode),
        `${item.title}: aggregate returned the wrong episode`);
    }

    const candidateSources = [];
    const seenSources = new Set();
    for (const match of matches) {
      if (seenSources.has(match.source.slug)) continue;
      seenSources.add(match.source.slug);
      candidateSources.push(match.source);
    }
    let source = null;
    let standaloneCount = null;
    for (const candidateSource of candidateSources) {
      const relative = modulePath(candidateSource.slug);
      if (!relative) continue;
      const standalone = load(relative);
      const standaloneResources = await standalone.loadResource({ ...item });
      if (!standaloneResources.length) continue;
      assert(standaloneResources.every(row => /\.m3u8(?:[?#]|$)/i.test(row.url)),
        `${item.title}: ${candidateSource.name} standalone returned a non-M3U8 URL`);
      source = candidateSource;
      standaloneCount = standaloneResources.length;
      break;
    }
    assert(source, `${item.title}: no matched standalone source could play the requested item`);

    results.push({
      title: item.title,
      keyword,
      matches: matches.length,
      sources: new Set(matches.map(row => row.source.name)).size,
      aggregate: resources.length,
      standalone: source ? `${source.name}:${standaloneCount}` : "none",
      matchedTitles: [...new Set(matches.map(row => row.item.vod_name))].slice(0, 5).join(" | "),
      ms: Date.now() - started
    });
    console.log(`${item.title}: ${resources.length} aggregate resources; ${source ? source.name : "no standalone"}=${standaloneCount}`);
  }

  console.table(results);
  console.log(`${results.length}/${cases.length} live title cases passed aggregate and standalone playback checks.`);
})().catch(error => { console.error(error); process.exitCode = 1; });

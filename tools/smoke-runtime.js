"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
function load(relative) {
  const context = {
    console,
    setTimeout,
    clearTimeout,
    URL,
    Widget: {
      http: {
        get: async (url, options) => {
          const response = await fetch(url, {
            headers: (options && options.headers) || {},
            signal: AbortSignal.timeout(15000)
          });
          const text = await response.text();
          let data = text;
          try { data = JSON.parse(text); } catch (_) {}
          return { statusCode: response.status, data };
        }
      }
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, relative), "utf8"), context, { filename: relative });
  return context;
}

async function main() {
  const feifan = load("sources/feifan/Rex-Feifan-VOD.js");
  const feifanHome = await feifan.loadFeifanList({ page: 1 });
  const feifanMovies = await feifan.loadFeifanMovies({ category: "6", page: 1 });
  const feifanSearch = await feifan.searchFeifan({ keyword: "朱色的面具", page: 1 });
  const feifanResource = await feifan.loadResource({ title: "朱色的面具", type: "tv" });
  console.log("非凡", { home: feifanHome.length, movies: feifanMovies.length, search: feifanSearch.length, resources: feifanResource.length, m3u8: feifanResource.every(row => /\.m3u8(?:[?#]|$)/i.test(row.url)) });

  const liangzi = load("sources/liangzi/Rex-Liangzi-VOD.js");
  const liangziHome = await liangzi.loadSourceHome({ page: 1 });
  const liangziMovies = await liangzi.loadSourceMovies({ category: "all", page: 1 });
  const liangziSearch = await liangzi.searchSource({ keyword: "朱色的面具", page: 1 });
  const liangziResource = await liangzi.loadResource({ title: "朱色的面具", type: "tv" });
  console.log("量子", { home: liangziHome.length, movies: liangziMovies.length, search: liangziSearch.length, resources: liangziResource.length, m3u8: liangziResource.every(row => /\.m3u8(?:[?#]|$)/i.test(row.url)) });

  const aggregate = load("aggregate/Rex-CineVerse/Rex-CineVerse.js");
  const aggregateHome = await aggregate.loadCineverseHome({ page: 1 });
  const aggregateMovies = await aggregate.loadCineverseMovies({ page: 1 });
  const aggregateResources = await aggregate.loadResource({ title: "朱色的面具", type: "tv" });
  console.log("寰宇影源", { home: aggregateHome.length, movies: aggregateMovies.length, resources: aggregateResources.length, m3u8: aggregateResources.every(row => /\.m3u8(?:[?#]|$)/i.test(row.url)) });

  if (!feifanHome.length || !feifanMovies.length || !feifanSearch.length || !feifanResource.length || !liangziHome.length || !liangziMovies.length || !liangziSearch.length || !liangziResource.length || !aggregateHome.length || !aggregateMovies.length || !aggregateResources.length) {
    throw new Error("runtime smoke test returned an empty required result");
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });

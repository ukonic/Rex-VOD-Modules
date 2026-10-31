"use strict";

const sources = require("./source-configs");

function firstM3u8(list) {
  for (const item of list) {
    const match = String(item.vod_play_url || "").match(/https?:[^#$\s]+\.m3u8(?:\?[^#$\s]*)?/i);
    if (match) return match[0];
  }
  return "";
}

async function test(source) {
  const separator = source.api.includes("?") ? "&" : "?";
  try {
    const apiResponse = await fetch(source.api + separator + "ac=detail&pg=1", { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(15000) });
    const data = await apiResponse.json();
    const url = firstM3u8(Array.isArray(data.list) ? data.list : []);
    if (!url) return { priority: source.priority, name: source.name, ok: false, error: "no direct m3u8" };
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(15000) });
    const text = await response.text();
    return { priority: source.priority, name: source.name, http: response.status, manifest: text.trimStart().startsWith("#EXTM3U"),
      master: /#EXT-X-STREAM-INF/i.test(text), ok: response.ok && text.trimStart().startsWith("#EXTM3U") };
  } catch (error) {
    return { priority: source.priority, name: source.name, ok: false, error: error.message };
  }
}

async function main() {
  const results = [];
  for (let index = 0; index < sources.length; index += 5) {
    results.push(...await Promise.all(sources.slice(index, index + 5).map(test)));
  }
  console.table(results);
  const passed = results.filter(row => row.ok).length;
  console.log(`${passed}/${results.length} sampled M3U8 manifests are reachable.`);
  process.exitCode = passed === results.length ? 0 : 2;
}
main();

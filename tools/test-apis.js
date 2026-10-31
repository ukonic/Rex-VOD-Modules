"use strict";

const sources = require("./source-configs");

async function test(source) {
  const controller = new AbortController();
  const started = Date.now();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const separator = source.api.includes("?") ? "&" : "?";
    const response = await fetch(source.api + separator + "ac=detail&pg=1", {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json, text/plain, */*" }
    });
    const data = await response.json();
    const list = Array.isArray(data.list) ? data.list : [];
    const hasM3u8 = list.some(item => /\.m3u8(?:[?#]|$)/i.test(String(item.vod_play_url || "")));
    return { priority: source.priority, name: source.name, http: response.status, code: data.code, items: list.length,
      total: Number(data.total || 0), m3u8: hasM3u8, ms: Date.now() - started, ok: response.ok && list.length > 0 && hasM3u8 };
  } catch (error) {
    return { priority: source.priority, name: source.name, ok: false, error: error.message, ms: Date.now() - started };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const results = [];
  for (let index = 0; index < sources.length; index += 8) {
    results.push(...await Promise.all(sources.slice(index, index + 8).map(test)));
  }
  console.table(results);
  const passed = results.filter(row => row.ok).length;
  console.log(`${passed}/${results.length} APIs returned items with direct M3U8 URLs.`);
  process.exitCode = passed === results.length ? 0 : 2;
}
main();

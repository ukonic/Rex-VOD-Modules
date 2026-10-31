"use strict";

const sources = require("./generated-sources.json");
const requested = new Set(process.argv.slice(2));
const selectedSources = requested.size ? sources.filter(source => requested.has(source.slug)) : sources;
const pageCount = Math.max(1, Math.min(10, Number(process.env.VOD_SAMPLE_PAGES) || 1));
const sampleLimit = Math.max(1, Math.min(30, Number(process.env.VOD_SAMPLE_LIMIT) || 3));

function urls(list, limit) {
  const result = [];
  const seen = new Set();
  for (const item of Array.isArray(list) ? list : []) {
    const text = String(item.vod_play_url || "");
    const matches = text.match(/https?:[^#$\s]+\.m3u8(?:\?[^#$\s]*)?/ig) || [];
    for (const url of matches) {
      if (seen.has(url)) continue;
      seen.add(url);
      result.push(url);
      if (result.length >= limit) return result;
    }
  }
  return result;
}

async function fetchWithRetry(url, options, attempts) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { ...options, signal: AbortSignal.timeout(15000) });
      const text = await response.text();
      if (response.ok) return { response, text, attempt };
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function test(source) {
  const separator = source.api.includes("?") ? "&" : "?";
  const headers = {
    "User-Agent": `Mozilla/5.0 (Rex ForwardWidget; sample-test/${source.slug})`,
    Accept: "application/json, text/plain, */*",
    Referer: source.site
  };
  try {
    let rows = [];
    for (let page = 1; page <= pageCount; page += 1) {
      const api = await fetchWithRetry(source.api + separator + `ac=detail&pg=${page}`, { headers }, 3);
      let data;
      try { data = JSON.parse(api.text); } catch (_) { throw new Error("API returned non-JSON"); }
      rows = rows.concat(Array.isArray(data.list) ? data.list : []);
    }
    const samples = urls(rows, sampleLimit);
    const checks = [];
    for (const url of samples) {
      try {
        const result = await fetchWithRetry(url, { headers: { "User-Agent": headers["User-Agent"], Referer: source.site } }, 2);
        checks.push({ ok: result.response.ok && result.text.trimStart().startsWith("#EXTM3U"), status: result.response.status });
      } catch (error) {
        checks.push({ ok: false, error: error.message });
      }
    }
    const reachable = checks.filter(row => row.ok).length;
    return {
      priority: source.priority,
      name: source.name,
      status: source.status,
      samples: samples.length,
      reachable,
      rate: samples.length ? `${reachable}/${samples.length}` : "0/0",
      hosts: [...new Set(samples.map(url => { try { return new URL(url).host; } catch (_) { return "invalid"; } }))].join(", "),
      ok: samples.length > 0 && reachable > 0,
      failures: checks.filter(row => !row.ok).map(row => row.error || `HTTP ${row.status}`).join(", ")
    };
  } catch (error) {
    return { priority: source.priority, name: source.name, status: source.status, samples: 0, reachable: 0, rate: "0/0", ok: false, failures: error.message };
  }
}

(async () => {
  const results = [];
  for (let index = 0; index < selectedSources.length; index += 4) {
    results.push(...await Promise.all(selectedSources.slice(index, index + 4).map(test)));
  }
  console.table(results);
  const usable = results.filter(row => row.ok).length;
  const full = results.filter(row => row.samples > 0 && row.reachable === row.samples).length;
  console.log(`${usable}/${results.length} sources have at least one reachable sampled M3U8; ${full}/${results.length} passed every sample.`);
  process.exitCode = usable === results.length ? 0 : 2;
})().catch(error => { console.error(error); process.exitCode = 1; });

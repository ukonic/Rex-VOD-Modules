"use strict";

const fs = require("fs");
const path = require("path");
const sources = require("./source-configs");

const root = path.resolve(__dirname, "..");
const templatePath = path.join(__dirname, "templates", "standalone.template.js");
const template = fs.readFileSync(templatePath, "utf8");
const generatedPath = path.join(__dirname, "generated-sources.json");
const previousSources = fs.existsSync(generatedPath)
  ? JSON.parse(fs.readFileSync(generatedPath, "utf8"))
  : [];
const previousBySlug = new Map(previousSources.map(source => [source.slug, source]));

const fallback = {
  movie: [
    ["动作片", "6"], ["喜剧片", "7"], ["爱情片", "8"], ["科幻片", "9"],
    ["恐怖片", "10"], ["剧情片", "11"], ["战争片", "12"], ["纪录片", "20"]
  ],
  tv: [
    ["国产剧", "13"], ["香港剧", "14"], ["韩国剧", "15"], ["欧美剧", "16"],
    ["台湾剧", "21"], ["日本剧", "22"], ["海外剧", "23"], ["泰国剧", "24"]
  ],
  variety: [["大陆综艺", "25"], ["港台综艺", "26"], ["日韩综艺", "27"], ["欧美综艺", "28"]],
  anime: [["国产动漫", "29"], ["日韩动漫", "30"], ["欧美动漫", "31"], ["港台动漫", "32"], ["海外动漫", "33"]],
  short: [["短剧", "36"]]
};

function rows(entries) {
  return entries.map(([title, value]) => ({ title, value }));
}

function fallbackCategories() {
  return Object.fromEntries(Object.entries(fallback).map(([key, value]) => [key, rows(value)]));
}

function fileStem(slug) {
  const special = { zy360: "360", zy1080: "1080", ok: "OK", ikun: "IKUN", iqiyi: "Iqiyi" };
  const value = special[slug] || slug.replace(/(^|[-_])(\w)/g, (_, __, letter) => letter.toUpperCase());
  return `Rex-${value}-VOD`;
}

function origin(url) {
  try { return new URL(url).origin + "/"; } catch (_) { return url; }
}

async function getJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const separator = url.includes("?") ? "&" : "?";
    const response = await fetch(url + separator + "ac=list&pg=1", {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json, text/plain, */*" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function classify(classes) {
  if (!Array.isArray(classes) || !classes.length) return fallbackCategories();
  const byId = new Map(classes.map(row => [String(row.type_id), row]));
  const result = { movie: [], tv: [], variety: [], anime: [], short: [] };
  const seen = Object.fromEntries(Object.keys(result).map(key => [key, new Set()]));

  for (const row of classes) {
    const id = String(row.type_id || "").trim();
    const title = String(row.type_name || "").replace(/<[^>]+>/g, "").trim();
    if (!id || !title || /伦理|福利|成人|写真|里番|情色|无码|有码/i.test(title)) continue;
    const chain = [title];
    let parent = byId.get(String(row.type_pid || ""));
    let guard = 0;
    while (parent && guard++ < 4) {
      chain.push(String(parent.type_name || ""));
      parent = byId.get(String(parent.type_pid || ""));
    }
    const text = chain.join(" ");
    let key = "";
    if (/短剧|微短剧/i.test(text)) key = "short";
    else if (/动漫|动画|卡通|新番/i.test(text)) key = "anime";
    else if (/综艺|真人秀|脱口秀/i.test(text)) key = "variety";
    else if (/电影|动作片|喜剧片|爱情片|科幻片|恐怖片|剧情片|战争片|纪录片|悬疑片|犯罪片/i.test(text)) key = "movie";
    else if (/电视剧|连续剧|国产剧|香港剧|韩国剧|欧美剧|台湾剧|日本剧|海外剧|泰国剧|剧集/i.test(text)) key = "tv";
    if (!key || seen[key].has(id)) continue;
    seen[key].add(id);
    result[key].push({ title, value: id });
  }

  const defaults = fallbackCategories();
  for (const key of Object.keys(result)) {
    if (!result[key].length) result[key] = defaults[key];
    result[key] = result[key].slice(0, 30);
  }
  return result;
}

async function enrich(source) {
  let categories;
  let apiStatus = "ok";
  let checkedAt = new Date().toISOString();
  try {
    const payload = await getJson(source.api);
    categories = classify(payload.class);
  } catch (error) {
    const previous = previousBySlug.get(source.slug);
    categories = source.categories || (previous && previous.categories) || fallbackCategories();
    apiStatus = source.categories ? "configured" : (previous && previous.categories ? "previous" : "fallback");
    console.warn(`${source.name}: ${error.message}; using ${apiStatus} categories`);
  }
  const version = source.version || "0.1.4";
  const site = origin(source.api);
  return {
    ...source,
    version,
    site,
    icon: site + "favicon.ico",
    categories,
    status: source.status || "active",
    apiStatus,
    checkedAt,
    file: `${fileStem(source.slug)}.js`
  };
}

function moduleSource(config) {
  const runtimeConfig = {
    slug: config.slug,
    name: config.name,
    shortName: config.shortName,
    api: config.api,
    site: config.site,
    icon: config.icon,
    version: config.version,
    priority: config.priority,
    tier: config.tier,
    categories: config.categories
  };
  return template
    .replaceAll("__MODULE_NAME__", config.name)
    .replace("__SOURCE_CONFIG__", JSON.stringify(runtimeConfig, null, 2));
}

function readme(config) {
  return `# ${config.name}\n\nRex / ForwardWidgets 独立 VOD 模块，仅保留直接 M3U8 线路。\n\n## 导入\n\n\`\`\`text\nhttps://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/main/sources/${config.slug}/${config.file}\n\`\`\`\n\n## 功能\n\n- ${config.name}最近更新\n- ${config.shortName}电影、剧集、综艺、动漫、短剧\n- 搜索${config.name}\n- 加载${config.shortName}播放源\n\n接口：\`${config.api}\`\n`;
}

async function main() {
  const enriched = [];
  for (let index = 0; index < sources.length; index += 8) {
    const batch = await Promise.all(sources.slice(index, index + 8).map(enrich));
    enriched.push(...batch);
  }

  for (const config of enriched) {
    const folder = path.join(root, "sources", config.slug);
    const versions = path.join(folder, "versions");
    fs.mkdirSync(versions, { recursive: true });
    const code = moduleSource(config);
    fs.writeFileSync(path.join(folder, config.file), code, "utf8");
    fs.writeFileSync(path.join(versions, `${fileStem(config.slug)}-v${config.version}.js`), code, "utf8");
    fs.writeFileSync(path.join(folder, "README.md"), readme(config), "utf8");
  }

  const registry = enriched.map(config => ({
    priority: config.priority,
    id: config.slug,
    name: config.name,
    api: config.api,
    tier: config.tier,
    status: config.status,
    categoryStatus: config.apiStatus,
    checkedAt: config.checkedAt,
    module: `sources/${config.slug}/${config.file}`,
    version: config.version,
    m3u8Only: true
  }));
  fs.writeFileSync(path.join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n", "utf8");
  fs.writeFileSync(generatedPath, JSON.stringify(enriched, null, 2) + "\n", "utf8");
  console.log(`Generated ${enriched.length} standalone modules.`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const generated = JSON.parse(fs.readFileSync(path.join(__dirname, "generated-sources.json"), "utf8"));
const template = fs.readFileSync(path.join(__dirname, "templates", "aggregate.template.js"), "utf8");
const version = "0.1.16";
const config = {
  version,
  sources: generated.map(source => ({
    slug: source.slug,
    name: source.name,
    shortName: source.shortName,
    playbackName: source.playbackName,
    api: source.api,
    searchApi: source.searchApi,
    site: source.site,
    icon: source.icon,
    blockedCoverHosts: source.blockedCoverHosts || [],
    priority: source.priority,
    tier: source.tier,
    categories: source.categories
  }))
};
const code = template.replace("__AGG_CONFIG__", JSON.stringify(config, null, 2));
const folder = path.join(root, "aggregate", "Rex-CineVerse");
fs.mkdirSync(path.join(folder, "versions"), { recursive: true });
fs.writeFileSync(path.join(folder, "Rex-CineVerse.js"), code, "utf8");
fs.writeFileSync(path.join(folder, "versions", `Rex-CineVerse-v${version}.js`), code, "utf8");
fs.writeFileSync(path.join(folder, "README.md"), `# 寰宇影源\n\n40个 M3U8 资源站聚合模块。\n\n## 导入\n\n\`\`\`text\nhttps://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/main/aggregate/Rex-CineVerse/Rex-CineVerse.js\n\`\`\`\n\n## 播放源策略\n\n- 全部资源站（默认）：搜索全部40个资源站，保留完整播放源。\n- 自动分级：先搜索 S/A 级优先资源站；少于3个资源站命中时，再搜索 B/C/D 级备用资源站。\n- 仅优先资源站：只搜索 S/A 级资源站，速度更快。\n\n## 功能入口\n\n- 寰宇影源\n- 寰宇电影\n- 寰宇剧集\n- 寰宇综艺\n- 寰宇动漫\n- 寰宇短剧\n- 资源站库\n- 全网搜索\n- 多源播放\n\n聚合模块运行时不依赖 \`registry.json\` 或独立模块文件。\n`, "utf8");
console.log(`Generated Rex-CineVerse v${version}.`);

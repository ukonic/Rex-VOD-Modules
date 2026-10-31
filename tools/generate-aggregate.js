"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const generated = JSON.parse(fs.readFileSync(path.join(__dirname, "generated-sources.json"), "utf8"));
const template = fs.readFileSync(path.join(__dirname, "templates", "aggregate.template.js"), "utf8");
const version = "0.1.21";
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
fs.writeFileSync(path.join(folder, "README.md"), `# 寰宇影源\n\n40个 M3U8 资源站接入，其中38个参与聚合。\n\n## 导入\n\n\`\`\`text\nhttps://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/refs/heads/main/aggregate/Rex-CineVerse/Rex-CineVerse.js\n\`\`\`\n\n如Rex仍缓存旧版本，可使用当前固定版本地址重新导入：\n\n\`\`\`text\nhttps://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/refs/heads/main/aggregate/Rex-CineVerse/versions/Rex-CineVerse-v${version}.js\n\`\`\`\n\n## 播放源策略\n\n- 自动分层（默认）：按 S → A → B+C 逐级搜索，达到用户填写的目标资源站数量后停止。\n- 完整聚合：搜索 S、A、B、C、D 级共38个资源站。\n- 仅核心站：只搜索9个 S 级资源站。\n- D级仅在完整聚合模式下参与，自动分层和仅核心站不会调用。\n- 另外2个资源站仅可在资源站库中手动浏览和播放，不参与任何聚合策略。\n\n“自动分层目标数（仅自动分层生效）”默认为3，可在全局设置中填写1–20；统计的是不同资源站数量，不是播放线路数量，完整聚合和仅核心站模式会忽略该数值。\n\n## 功能入口\n\n- 寰宇影源\n- 寰宇电影\n- 寰宇剧集\n- 寰宇综艺\n- 寰宇动漫\n- 寰宇短剧\n- 资源站库\n- 全网搜索\n- 多源播放\n\n聚合模块运行时不依赖 \`registry.json\` 或独立模块文件。\n`, "utf8");
console.log(`Generated Rex-CineVerse v${version}.`);

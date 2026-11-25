"use strict";

const fs = require("fs");
const path = require("path");
const { literalManifest, searchId, writeVersion } = require("./module-release");

const root = path.resolve(__dirname, "..");
const generated = JSON.parse(fs.readFileSync(path.join(__dirname, "generated-sources.json"), "utf8"));
const template = fs.readFileSync(path.join(__dirname, "templates", "aggregate.template.js"), "utf8");
const version = "0.1.24";
const aggregateSources = generated.filter(source => source.tier !== "R");
const coreSources = generated.filter(source => source.tier === "S");
const completeOnlySources = generated.filter(source => source.tier === "D");
const independentSources = generated.filter(source => source.tier === "R");
const config = {
  version,
  icon: "https://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/refs/heads/main/aggregate/Rex-CineVerse/icon.png",
  searchId: searchId("全网搜索"),
  sources: generated.map(source => ({
    slug: source.slug,
    name: source.name,
    shortName: source.shortName,
    playbackName: source.playbackName,
    api: source.api,
    fallbackApi: source.fallbackApi,
    searchApi: source.searchApi,
    site: source.site,
    icon: source.icon,
    blockedCoverHosts: source.blockedCoverHosts || [],
    priority: source.priority,
    tier: source.tier,
    categories: source.categories
  }))
};
const code = literalManifest(template.replace("__AGG_CONFIG__", JSON.stringify(config, null, 2)));
const folder = path.join(root, "aggregate", "Rex-CineVerse");
fs.mkdirSync(path.join(folder, "versions"), { recursive: true });
writeVersion(path.join(folder, "versions", `Rex-CineVerse-v${version}.js`), code);
fs.writeFileSync(path.join(folder, "Rex-CineVerse.js"), code, "utf8");
fs.writeFileSync(path.join(folder, "README.md"), `# 寰宇影源

${generated.length}个 M3U8 资源站接入，其中${aggregateSources.length}个参与聚合。

## 导入

\`\`\`text
https://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/refs/heads/main/aggregate/Rex-CineVerse/Rex-CineVerse.js
\`\`\`

如Rex仍缓存旧版本，可使用当前固定版本地址重新导入：

\`\`\`text
https://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/refs/heads/main/aggregate/Rex-CineVerse/versions/Rex-CineVerse-v${version}.js
\`\`\`

## 播放源策略

- 自动分层（默认）：按 S → A → B+C 逐级搜索，达到用户填写的目标资源站数量后停止。
- 完整聚合：搜索 S、A、B、C、D 级共${aggregateSources.length}个资源站。
- 仅核心站：只搜索${coreSources.length}个 S 级资源站。
- ${completeOnlySources.length}个 D 级资源站仅在完整聚合模式下参与，自动分层和仅核心站不会调用。
- 另外${independentSources.length}个 R 级资源站仅可在资源站库中手动浏览和播放，不参与任何聚合策略。

“自动分层目标数（仅自动分层生效）”默认为3，可在全局设置中填写1–20；播放时统计提供当前影片或分集线路的不同资源站，完整聚合和仅核心站模式会忽略该数值。

## 功能入口

- 寰宇影源
- 寰宇电影
- 寰宇剧集
- 寰宇综艺
- 寰宇动漫
- 寰宇短剧
- 资源站库
- 全网搜索
- 多源播放

聚合模块运行时不依赖 \`registry.json\` 或独立模块文件。
`, "utf8");
console.log(`Generated Rex-CineVerse v${version}.`);

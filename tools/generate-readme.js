"use strict";

const fs = require("fs");
const path = require("path");
const registry = require(path.resolve(__dirname, "..", "registry.json"));

const rows = registry.map(row => `| ${row.priority} | ${row.name} | ${row.tier} | [JS](${row.module}) | \`${row.api}\` |`).join("\n");
const text = `# Rex VOD Modules\n\n由 **ukonic** 维护的 Rex / ForwardWidgets M3U8 点播模块集合。\n\n- 40个资源站独立模块，可分别导入和维护。\n- 聚合模块：**寰宇影源**。\n- 所有发布模块均为单文件运行，不依赖 \`registry.json\`、\`tools/\` 或其他模块。\n- 仅保留直接 M3U8，不包含 YParse、网页嗅探、Cookie 或账号。\n\n## 寰宇影源\n\n稳定导入地址：\n\n\`\`\`text\nhttps://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/main/aggregate/Rex-CineVerse/Rex-CineVerse.js\n\`\`\`\n\n功能入口：寰宇影源、寰宇电影、寰宇剧集、寰宇综艺、寰宇动漫、寰宇短剧、资源站库、全网搜索、多源播放。\n\n## 仓库结构\n\n\`\`\`text\nRex-VOD-Modules/\n├─ sources/                 # 40个独立模块\n├─ aggregate/Rex-CineVerse # 寰宇影源\n├─ registry.json            # 维护清单，运行时不依赖\n└─ tools/                   # 生成与检测脚本\n\`\`\`\n\n## 资源站\n\n| 排序 | 名称 | 级别 | 模块 | API |\n|---:|---|:---:|---|---|\n${rows}\n\n## 测试\n\n\`\`\`powershell\nnode tools/check-syntax.js\nnode tools/test-apis.js\nnode tools/test-m3u8.js\n\`\`\`\n\n接口属于外部服务，当前可用不代表永久可用；实际 Rex 客户端行为需在客户端继续验证。\n`;
fs.writeFileSync(path.resolve(__dirname, "..", "README.md"), text, "utf8");

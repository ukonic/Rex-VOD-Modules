# 寰宇影源

40个 M3U8 资源站聚合模块。

## 导入

```text
https://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/refs/heads/main/aggregate/Rex-CineVerse/Rex-CineVerse.js
```

如Rex仍缓存旧版本，可使用当前固定版本地址重新导入：

```text
https://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/refs/heads/main/aggregate/Rex-CineVerse/versions/Rex-CineVerse-v0.1.19.js
```

## 播放源策略

- 自动分层（默认）：按 S → A → B+C 逐级搜索，达到用户填写的目标资源站数量后停止。
- 完整聚合：搜索 S、A、B、C 级共37个可用资源站。
- 仅核心站：只搜索10个 S 级资源站。
- D级百度、豆瓣、爱奇艺默认关闭，不参与自动分层和完整聚合。

“自动分层目标数（仅自动模式）”默认为3，可在全局设置中填写1–20；统计的是不同资源站数量，不是播放线路数量，完整聚合和仅核心站模式会忽略该数值。

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

聚合模块运行时不依赖 `registry.json` 或独立模块文件。

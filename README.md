# Rex VOD Modules

由 **ukonic** 维护的 Rex / ForwardWidgets M3U8 点播模块集合。

- 40个资源站独立模块，可分别导入和维护。
- 聚合模块：**寰宇影源**。
- 所有发布模块均为单文件运行，不依赖 `registry.json`、`tools/` 或其他模块。
- 仅保留直接 M3U8，不包含 YParse、网页嗅探、Cookie 或账号。

## 寰宇影源

稳定导入地址：

```text
https://raw.githubusercontent.com/ukonic/Rex-VOD-Modules/main/aggregate/Rex-CineVerse/Rex-CineVerse.js
```

功能入口：寰宇影源、寰宇电影、寰宇剧集、寰宇综艺、寰宇动漫、寰宇短剧、资源站库、全网搜索、多源播放。

## 仓库结构

```text
Rex-VOD-Modules/
├─ sources/                 # 40个独立模块
├─ aggregate/Rex-CineVerse # 寰宇影源
├─ registry.json            # 维护清单，运行时不依赖
└─ tools/                   # 生成与检测脚本
```

## 资源站

| 排序 | 名称 | 级别 | 模块 | API |
|---:|---|:---:|---|---|
| 1 | 非凡资源 | S | [JS](sources/feifan/Rex-Feifan-VOD.js) | `https://api.ffzyapi.com/api.php/provide/vod/from/ffm3u8/` |
| 2 | 量子资源 | S | [JS](sources/liangzi/Rex-Liangzi-VOD.js) | `https://cj.lziapi.com/api.php/provide/vod/` |
| 3 | 最大资源 | S | [JS](sources/zuida/Rex-Zuida-VOD.js) | `https://api.zuidapi.com/api.php/provide/vod/` |
| 4 | 无尽资源 | S | [JS](sources/wujin/Rex-Wujin-VOD.js) | `https://api.wujinapi.com/api.php/provide/vod/` |
| 5 | 魔都资源 | S | [JS](sources/modu/Rex-Modu-VOD.js) | `https://www.mdzyapi.com/api.php/provide/vod/` |
| 6 | 360资源 | S | [JS](sources/zy360/Rex-360-VOD.js) | `https://360zy.com/api.php/provide/vod/` |
| 7 | 电影天堂资源 | S | [JS](sources/dytt/Rex-Dytt-VOD.js) | `https://caiji.dyttzyapi.com/api.php/provide/vod/` |
| 8 | 光速资源 | S | [JS](sources/guangsu/Rex-Guangsu-VOD.js) | `https://api.guangsuapi.com/api.php/provide/vod/` |
| 9 | 暴风资源 | S | [JS](sources/baofeng/Rex-Baofeng-VOD.js) | `https://bfzyapi.com/api.php/provide/vod/` |
| 10 | 红牛资源 | S | [JS](sources/hongniu/Rex-Hongniu-VOD.js) | `https://www.hongniuzy2.com/api.php/provide/vod/` |
| 11 | 极速资源 | A | [JS](sources/jisu/Rex-Jisu-VOD.js) | `https://jszyapi.com/api.php/provide/vod/` |
| 12 | 如意资源 | A | [JS](sources/ruyi/Rex-Ruyi-VOD.js) | `https://cj.rycjapi.com/api.php/provide/vod/` |
| 13 | IKUN资源 | A | [JS](sources/ikun/Rex-IKUN-VOD.js) | `https://ikunzyapi.com/api.php/provide/vod/` |
| 14 | 优酷资源 | A | [JS](sources/youku/Rex-Youku-VOD.js) | `https://api.ukuapi.com/api.php/provide/vod/` |
| 15 | 索尼资源 | A | [JS](sources/suoni/Rex-Suoni-VOD.js) | `https://suoniapi.com/api.php/provide/vod/` |
| 16 | 牛牛资源 | A | [JS](sources/niuniu/Rex-Niuniu-VOD.js) | `https://api.niuniuzy.me/api.php/provide/vod/` |
| 17 | 闪电资源 | A | [JS](sources/shandian/Rex-Shandian-VOD.js) | `https://sdzyapi.com/api.php/provide/vod/` |
| 18 | OK资源 | A | [JS](sources/ok/Rex-OK-VOD.js) | `https://api.okzyw.net/api.php/provide/vod/` |
| 19 | 猫眼资源 | A | [JS](sources/maoyan/Rex-Maoyan-VOD.js) | `https://api.maoyanapi.top/api.php/provide/vod/` |
| 20 | 快车资源 | A | [JS](sources/kuaiche/Rex-Kuaiche-VOD.js) | `https://caiji.kuaichezy.org/api.php/provide/vod/` |
| 21 | 天涯资源 | B | [JS](sources/tianya/Rex-Tianya-VOD.js) | `https://tyyszyapi.com/api.php/provide/vod/` |
| 22 | 虎牙资源 | B | [JS](sources/huya/Rex-Huya-VOD.js) | `https://www.huyaapi.com/api.php/provide/vod/` |
| 23 | 新浪资源 | B | [JS](sources/xinlang/Rex-Xinlang-VOD.js) | `http://api.xinlangapi.com/xinlangapi.php/provide/vod/` |
| 24 | 豪华资源 | B | [JS](sources/haohua/Rex-Haohua-VOD.js) | `https://hhzyapi.com/api.php/provide/vod/` |
| 25 | 爱蛋资源 | B | [JS](sources/aidan/Rex-Aidan-VOD.js) | `https://lovedan.net/api.php/provide/vod/` |
| 26 | 樱花资源 | B | [JS](sources/yinghua/Rex-Yinghua-VOD.js) | `https://m3u8.apiyhzy.com/api.php/provide/vod/` |
| 27 | 速播资源 | B | [JS](sources/subo/Rex-Subo-VOD.js) | `https://subocaiji.com/api.php/provide/vod/` |
| 28 | 金鹰资源 | B | [JS](sources/jinying/Rex-Jinying-VOD.js) | `https://jyzyapi.com/api.php/provide/vod/` |
| 29 | 第一资源 | B | [JS](sources/diyi/Rex-Diyi-VOD.js) | `https://caiji.diyizy.net/api.php/provide/vod/` |
| 30 | 厂长资源 | B | [JS](sources/changzhang/Rex-Changzhang-VOD.js) | `https://api.changzhang.tv/api.php/provide/vod/from/changzhangm3u8/` |
| 31 | 星夜资源 | B | [JS](sources/xingye/Rex-Xingye-VOD.js) | `https://xyezy.com/api.php/provide/vod/` |
| 32 | 番茄资源 | B | [JS](sources/fanqie/Rex-Fanqie-VOD.js) | `https://fqzy.me/api.php/provide/vod/` |
| 33 | 大地资源 | B | [JS](sources/dadi/Rex-Dadi-VOD.js) | `https://dadiapi.com/api.php/provide/vod/` |
| 34 | 百度资源 | C | [JS](sources/baidu/Rex-Baidu-VOD.js) | `https://api.apibdzy.com/api.php/provide/vod/` |
| 35 | 丫丫资源 | C | [JS](sources/yaya/Rex-Yaya-VOD.js) | `https://cj.yayazy.net/api.php/provide/vod/` |
| 36 | 1080资源库 | C | [JS](sources/zy1080/Rex-1080-VOD.js) | `https://api.1080zyku.com/inc/apijson.php` |
| 37 | 飘零资源 | C | [JS](sources/piaoling/Rex-Piaoling-VOD.js) | `https://p2100.net/api.php/provide/vod/` |
| 38 | 茅台资源 | C | [JS](sources/maotai/Rex-Maotai-VOD.js) | `https://caiji.maotaizy.cc/api.php/provide/vod/` |
| 39 | 豆瓣资源 | D | [JS](sources/douban/Rex-Douban-VOD.js) | `https://dbzy.tv/api.php/provide/vod/` |
| 40 | 爱奇艺资源 | D | [JS](sources/iqiyi/Rex-Iqiyi-VOD.js) | `http://iqiyizyapi.com/api.php/provide/vod/` |

## 测试

```powershell
node tools/check-syntax.js
node tools/test-apis.js
node tools/test-m3u8.js
```

接口属于外部服务，当前可用不代表永久可用；实际 Rex 客户端行为需在客户端继续验证。

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const listItems = [
  { vod_id: "101", vod_name: "封面测试一", type_id: "6", type_name: "动作片", vod_remarks: "HD" },
  { vod_id: "102", vod_name: "封面测试二", type_id: "7", type_name: "喜剧片", vod_remarks: "HD" }
];
const detailItems = listItems.map(item => ({
  ...item,
  vod_pic: `https://example.com/${item.vod_id}.jpg`,
  vod_year: "2026",
  vod_play_from: "ffm3u8",
  vod_play_url: `正片$https://example.com/${item.vod_id}.m3u8`
}));

const requests = [];
const context = {
  console, setTimeout, clearTimeout, URL,
  Widget: { http: { get: async url => {
    requests.push(url);
    const isDetail = /[?&]ac=detail(?:&|$)/.test(url);
    const isSearch = /[?&]wd=/.test(url);
    return { statusCode: 200, data: { code: 1, list: isDetail && !isSearch ? detailItems : listItems } };
  } } }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "sources/feifan/Rex-Feifan-VOD.js"), "utf8"), context);

(async () => {
  const items = await context.loadFeifanList({ page: 1 });
  if (items.length !== 2) throw new Error("Feifan list item count changed during cover enrichment");
  if (items.some(item => !/^https:\/\/example\.com\/\d+\.jpg$/.test(item.coverUrl))) {
    throw new Error("Feifan list covers were not enriched from the detail API");
  }
  const detailRequest = requests.find(url => /[?&]ac=detail(?:&|$)/.test(url));
  if (!detailRequest || !/[?&]ids=101%2C102(?:&|$)/.test(detailRequest)) {
    throw new Error("Feifan list covers were not requested in one ID batch");
  }
  requests.length = 0;
  const searchItems = await context.searchFeifan({ keyword: "封面测试一" });
  if (searchItems.length !== 2 || searchItems.some(item => !/^https:\/\/example\.com\/\d+\.jpg$/.test(item.coverUrl))) {
    throw new Error("Feifan search covers were not enriched from the detail API");
  }
  if (!requests.some(url => /[?&]ids=101%2C102(?:&|$)/.test(url))) {
    throw new Error("Feifan search covers were not requested in one ID batch");
  }
  console.log("Feifan list and search covers are enriched with batched detail requests.");
})().catch(error => { console.error(error); process.exitCode = 1; });

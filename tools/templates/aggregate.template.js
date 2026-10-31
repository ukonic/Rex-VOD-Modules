/*
 * Rex / ForwardWidgets - 寰宇影源
 * 40站聚合、严格匹配、仅直接 M3U8。运行时不依赖 registry.json 或其他文件。
 */
var CINEVERSE_CONFIG = __AGG_CONFIG__;
var CINEVERSE_SOURCES = CINEVERSE_CONFIG.sources;
var CV_MATCH_CACHE = {};
var CV_MATCH_CACHE_TTL = 180000;
var CV_AUTO_MIN_SOURCES = 3;

function cvText(value) { return value === null || value === undefined ? "" : String(value); }
function cvPrioritySource(source) { return source && (source.tier === "S" || source.tier === "A"); }
function cvSourceOptions() { return CINEVERSE_SOURCES.map(function (source) {
  return { title: (cvPrioritySource(source) ? "优先 · " : "备用 · ") + source.name, value: source.slug };
}); }
function cvPageParams() { return [{ name: "page", title: "页码", type: "page", value: "1" }]; }

var WidgetMetadata = {
  id: "rex.cineverse.vod",
  title: "寰宇影源",
  icon: "https://github.com/ukonic.png",
  version: CINEVERSE_CONFIG.version,
  requiredVersion: "0.0.1",
  description: "40个 M3U8 资源站聚合：首页、分类、单站浏览、全网搜索与多源播放",
  author: "ukonic",
  site: "https://github.com/ukonic/Rex-VOD-Modules",
  detailCacheDuration: 180,
  globalParams: [
    {
      name: "sourceStrategy", title: "播放源策略", type: "enumeration", value: "complete",
      enumOptions: [
        { title: "全部资源站（完整）", value: "complete" },
        { title: "自动分级（不足时降级）", value: "auto" },
        { title: "仅优先资源站（快速）", value: "priority" }
      ]
    }
  ],
  modules: [
    { id: "loadResource", title: "多源播放", functionName: "loadResource", type: "stream", cacheDuration: 0, params: [] },
    { id: "cineverseHome", title: "寰宇影源", description: "多站去重后的近期更新", functionName: "loadCineverseHome", cacheDuration: 180, params: cvPageParams() },
    { id: "cineverseMovies", title: "寰宇电影", functionName: "loadCineverseMovies", cacheDuration: 180, params: cvPageParams() },
    { id: "cineverseSeries", title: "寰宇剧集", functionName: "loadCineverseSeries", cacheDuration: 180, params: cvPageParams() },
    { id: "cineverseVariety", title: "寰宇综艺", functionName: "loadCineverseVariety", cacheDuration: 180, params: cvPageParams() },
    { id: "cineverseAnime", title: "寰宇动漫", functionName: "loadCineverseAnime", cacheDuration: 180, params: cvPageParams() },
    { id: "cineverseShort", title: "寰宇短剧", functionName: "loadCineverseShort", cacheDuration: 180, params: cvPageParams() },
    {
      id: "cineverseSources", title: "资源站库", functionName: "loadSourceLibrary", cacheDuration: 180,
      params: [
        { name: "source", title: "资源站", type: "enumeration", value: CINEVERSE_SOURCES[0].slug, enumOptions: cvSourceOptions() },
        { name: "channel", title: "频道", type: "enumeration", value: "home", enumOptions: [
          { title: "最近更新", value: "home" }, { title: "电影", value: "movie" }, { title: "剧集", value: "tv" },
          { title: "综艺", value: "variety" }, { title: "动漫", value: "anime" }, { title: "短剧", value: "short" }
        ] },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    }
  ],
  search: {
    title: "全网搜索", functionName: "searchCineverse",
    params: [
      { name: "keyword", title: "关键词", type: "input", description: "输入准确片名" },
      { name: "page", title: "页码", type: "page", value: "1" }
    ]
  }
};

var CV_BLOCKED = ["伦理片", "伦理", "福利", "里番", "无码", "有码", "情色", "色情", "成人", "成人视频", "写真", "SWAG", "口爆", "吞精", "掰穴", "AV在线", "DASS-"];

function cvJson(value) { return typeof value === "string" ? JSON.parse(value) : (value || {}); }
function cvStrip(value) {
  return cvText(value).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'").replace(/\s+/g, " ").trim();
}
function cvUrl(value) {
  var url = cvText(value).trim();
  var nested = url.match(/^https?:\/\/[^/]+\/(https?:\/\/.+)$/i);
  if (nested) url = nested[1];
  if (url.indexOf("//") === 0) return "https:" + url;
  if (url.indexOf("http://") === 0) return "https://" + url.slice(7);
  return url;
}
function cvCover(item, source) {
  var values = [item && item.vod_pic, item && item.vod_pic_thumb, item && item.vod_pic_slide,
    item && item.vod_pic_screenshot].map(function (value) { return cvText(value).trim(); }).filter(Boolean);
  values.sort(function (left, right) {
    return (/^(?:https?:)?\/\//i.test(right) ? 1 : 0) - (/^(?:https?:)?\/\//i.test(left) ? 1 : 0);
  });
  for (var index = 0; index < values.length; index += 1) {
    var cover = cvUrl(values[index]);
    if (cover && !/^https?:\/\//i.test(cover) && source) cover = cvText(source.site).replace(/\/+$/, "") + "/" + cover.replace(/^\/+/, "");
    var blocked = source && (source.blockedCoverHosts || []).some(function (host) {
      return cover.toLowerCase().indexOf("//" + cvText(host).toLowerCase() + "/") >= 0;
    });
    if (cover && !blocked) return cover;
  }
  return "";
}
function cvPage(value) { var number = Math.floor(Number(value)); return isFinite(number) && number > 0 ? number : 1; }
function cvSource(slug) {
  for (var i = 0; i < CINEVERSE_SOURCES.length; i += 1) if (CINEVERSE_SOURCES[i].slug === slug) return CINEVERSE_SOURCES[i];
  return null;
}
function cvSourceStrategy(params) {
  var value = cvText(params && params.sourceStrategy).toLowerCase();
  return value === "auto" || value === "priority" ? value : "complete";
}
function cvPlaybackSourceGroups(params) {
  var strategy = cvSourceStrategy(params);
  var priority = CINEVERSE_SOURCES.filter(cvPrioritySource);
  if (strategy === "complete") return { strategy: strategy, primary: CINEVERSE_SOURCES.slice(), fallback: [] };
  return {
    strategy: strategy,
    primary: priority,
    fallback: strategy === "auto" ? CINEVERSE_SOURCES.filter(function (source) { return !cvPrioritySource(source); }) : []
  };
}
function cvSourceCount(matches) {
  var seen = {};
  (matches || []).forEach(function (match) { if (match && match.source) seen[match.source.slug] = true; });
  return Object.keys(seen).length;
}
function cvMergeMatches(matches) {
  var seen = {};
  return (matches || []).filter(function (match) {
    if (!match || !match.source || !match.item) return false;
    var key = match.source.slug + "|" + cvIdentityTitle(match.item.vod_name);
    if (seen[key]) return false;
    seen[key] = true;
    return true;
  }).sort(function (a, b) {
    return Number(a.source.priority || 999) - Number(b.source.priority || 999);
  });
}
function cvApiUrl(source, params) {
  var pairs = [];
  Object.keys(params || {}).forEach(function (key) {
    var value = params[key];
    if (value === undefined || value === null || value === "") return;
    pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(value)));
  });
  var api = params && params.wd && source.searchApi ? source.searchApi : source.api;
  return api + (api.indexOf("?") >= 0 ? "&" : "?") + pairs.join("&");
}
function cvStatus(response) {
  var status = response && (response.statusCode || response.status);
  status = Number(status);
  return isFinite(status) && status > 0 ? status : 0;
}
async function cvGet(source, params) {
  var response = await Widget.http.get(cvApiUrl(source, params), { headers: {
    "User-Agent": "Mozilla/5.0 (Rex ForwardWidget; CineVerse/" + CINEVERSE_CONFIG.version + ")",
    Accept: "application/json, text/plain, */*", Referer: source.site
  } });
  var status = cvStatus(response);
  if (status >= 400) throw new Error(source.name + " HTTP " + status);
  var result = cvJson(response && response.data);
  if (Number(result.code) !== 1 && !Array.isArray(result.list)) throw new Error(source.name + " 返回异常");
  return result;
}
function cvSafeGet(source, params) { return cvGet(source, params).catch(function () { return { list: [] }; }); }
async function cvBatches(sources, worker, batchSize) {
  var result = [];
  for (var index = 0; index < sources.length; index += batchSize) {
    var batch = sources.slice(index, index + batchSize);
    var values = await Promise.all(batch.map(function (source) { return worker(source); }));
    result = result.concat(values);
  }
  return result;
}
function cvBlocked(item) {
  var text = [item && item.type_name, item && item.vod_name, item && item.vod_sub, item && item.vod_class,
    item && item.vod_tag, item && item.vod_remarks].map(cvText).join(" ").toLowerCase();
  for (var i = 0; i < CV_BLOCKED.length; i += 1) if (text.indexOf(CV_BLOCKED[i].toLowerCase()) >= 0) return true;
  return false;
}
function cvMediaType(item) {
  var value = cvText((item && item.type_name) || "") + " " + cvText((item && item.vod_class) || "");
  if (/电影|影片|动作片|喜剧片|爱情片|科幻片|恐怖片|剧情片|战争片|纪录片|悬疑片|犯罪片|灾难片|惊悚片|家庭片|古装片|历史片|动画片|短片|影视解说/i.test(value)) return "movie";
  return /电视剧|连续剧|剧集|国产剧|内地剧|大陆剧|香港剧|港剧|台湾剧|台剧|韩国剧|韩剧|欧美剧|美剧|日本剧|日剧|泰国剧|泰剧|海外剧|短剧|动漫|动画|综艺|电视/i.test(value)
    ? "tv" : "movie";
}
function cvLink(source, id) { return "cineverse://" + source.slug + "/" + encodeURIComponent(cvText(id)); }
function cvParseLink(link) {
  var match = cvText(link).match(/^cineverse:\/\/([^/]+)\/([^/?#]+)/i);
  return match ? { source: cvSource(match[1]), id: decodeURIComponent(match[2]) } : null;
}
function cvNormalize(value) {
  return cvStrip(value).toLowerCase().replace(/[（(][^）)]*[）)]/g, "").replace(/[\s·•:：,，.。!！?？'\"“”‘’\-_/\\]/g, "");
}
function cvIdentityTitle(value) {
  return cvStrip(value).toLowerCase().replace(/[（）()\[\]【】]/g, "").replace(/[\s·•:：,，.。!！?？'\"“”‘’\-_/\\]/g, "");
}
function cvEdition(item) {
  var explicitText = [item && item.vod_name, item && item.vod_sub, item && item.vod_remarks,
    item && item.vod_note].map(cvStrip).join(" ");
  var languageText = cvStrip(item && item.vod_lang);
  var rules = [
    [/国粤双语|国语粤语|粤国双语/i, "国粤双语"],
    [/国语版|普通话版|国语|普通话|国配版|国配/i, "国语"],
    [/粤语版|粤语|粤配版|粤配/i, "粤语"],
    [/台配版|台配国语|台配/i, "台配"],
    [/英语版|英语|英配版|英配/i, "英语"],
    [/日语版|日语|日配版|日配/i, "日语"],
    [/韩语版|韩语|韩配版|韩配/i, "韩语"],
    [/原声版|原声/i, "原声"],
    [/导演剪辑版|导演剪辑/i, "导演剪辑版"],
    [/加长版|加长剪辑/i, "加长版"],
    [/未删减版|未删减/i, "未删减版"],
    [/修复版|修复/i, "修复版"]
  ];
  for (var pass = 0; pass < 2; pass += 1) {
    var text = pass === 0 ? explicitText : languageText;
    for (var i = 0; i < rules.length; i += 1) if (rules[i][0].test(text)) return rules[i][1];
  }
  return "";
}
function cvExplicitEdition(item) {
  var text = [item && item.vod_name, item && item.vod_sub, item && item.vod_remarks,
    item && item.vod_note].map(cvStrip).join(" ");
  return /国粤双语|国语粤语|粤国双语|国语版|普通话版|国配|粤语版|粤配|台配|英语版|英配|日语版|日配|韩语版|韩配|原声版|导演剪辑|加长版|加长剪辑|未删减|修复版|HD国语|HD粤语/i.test(text);
}
function cvLineEdition(line, item) {
  var lineEdition = cvEdition({ vod_name: line && line.title });
  return lineEdition || cvTitleEdition(item && item.vod_name);
}
function cvShowEditionLabels(matches) {
  var editions = {};
  var explicit = false;
  matches.forEach(function (match) {
    var edition = cvTitleEdition(match.item && match.item.vod_name);
    if (edition) editions[edition] = true;
    if (cvExplicitEdition(match.item)) explicit = true;
    cvPlayLines(match.item).forEach(function (line) {
      var lineEdition = cvLineEdition(line, match.item);
      if (lineEdition) editions[lineEdition] = true;
      if (cvExplicitEdition({ vod_name: line.title })) explicit = true;
    });
  });
  return Object.keys(editions).length > 1 || explicit;
}
function cvBaseTitle(value) {
  return cvNormalize(value).replace(/国粤双语|国语粤语|粤国双语|国语版?|普通话版?|国配版?|粤语版?|粤配版?|台配国语|台配版?|英语版?|英配版?|日语版?|日配版?|韩语版?|韩配版?|原声版?|导演剪辑版?|加长版|加长剪辑|未删减版?|修复版?/g, "");
}
function cvTitleEdition(value) { return cvEdition({ vod_name: value }); }
function cvSearchTitle(value) {
  return cvStrip(value).replace(/(?:国粤双语|国语粤语|粤国双语|国语版?|普通话版?|国配版?|粤语版?|粤配版?|台配国语|台配版?|英语版?|英配版?|日语版?|日配版?|韩语版?|韩配版?|原声版?|导演剪辑版?|加长版|加长剪辑|未删减版?|修复版?)/gi, "").trim();
}
function cvSearchQueries(value) {
  var raw = cvStrip(value);
  var broad = cvSearchTitle(raw);
  var compact = broad.replace(/[\s·•:：,，.。!！?？'\"“”‘’\-_/\\（）()\[\]【】]/g, "");
  var candidates = [raw];
  if (broad) candidates.push(broad);
  if (/[\u3400-\u9fff]/.test(compact) && compact.length >= 6) {
    candidates.push(compact.slice(0, 3));
    candidates.push(compact.slice(-4));
  }
  var seen = {};
  return candidates.filter(function (query) {
    var key = cvIdentityTitle(query);
    if (!key || seen[key]) return false;
    seen[key] = true;
    return true;
  });
}
function cvSeason(value) {
  var match = cvStrip(value).match(/第\s*([0-9一二三四五六七八九十]+)\s*季/i);
  return match ? match[1] : "";
}
function cvM3u8(url) { return /^https?:\/\//i.test(cvText(url).trim()) && /\.m3u8(?:[?#]|$)/i.test(cvText(url).trim()); }
function cvPlayLines(item) {
  var sources = cvText(item && item.vod_play_from).split("$$$");
  var groups = cvText(item && item.vod_play_url).split("$$$");
  var lines = [];
  groups.forEach(function (group, groupIndex) {
    var route = cvText(sources[groupIndex] || ("线路" + (groupIndex + 1))).trim();
    var parsed = [];
    cvText(group).split("#").forEach(function (entry, entryIndex) {
      var raw = cvText(entry).trim();
      if (!raw) return;
      var separator = raw.indexOf("$");
      var title = separator >= 0 ? raw.slice(0, separator) : ("第" + (entryIndex + 1) + "集");
      var url = cvUrl(separator >= 0 ? raw.slice(separator + 1) : raw);
      if (cvM3u8(url)) parsed.push({ title: cvStrip(title) || ("第" + (entryIndex + 1) + "集"), url: url, index: entryIndex + 1, route: route });
    });
    if (/m3u8/i.test(route) || parsed.length) lines = lines.concat(parsed);
  });
  return lines;
}
function cvDescription(item, source, includeContent) {
  var lines = [];
  var meta = [cvStrip(item && item.vod_year), cvStrip(item && item.vod_area), cvStrip(item && item.vod_lang)].filter(Boolean);
  if (meta.length) lines.push(meta.join(" · "));
  if (source) lines.push("来源：" + source.name);
  var remarks = cvStrip(item && item.vod_remarks);
  if (remarks) lines.push("状态：" + remarks);
  if (includeContent) {
    var content = cvStrip((item && (item.vod_content || item.vod_blurb)) || "");
    if (content) lines.push("\n简介：\n" + content);
  }
  return lines.join("\n");
}
function cvListItem(item, source) {
  if (!item || !source || cvBlocked(item)) return null;
  var id = cvText(item.vod_id).trim();
  if (!id) return null;
  var cover = cvCover(item, source) || "https://github.com/ukonic.png";
  return { id: cvLink(source, id), type: "url", title: cvStrip(item.vod_name), description: cvDescription(item, source, false),
    coverUrl: cover, posterPath: cover, detailPoster: cover, releaseDate: cvStrip(item.vod_pubdate || item.vod_year),
    mediaType: cvMediaType(item), genreTitle: cvStrip(item.type_name || item.vod_class), rating: cvStrip(item.vod_score),
    link: cvLink(source, id), playerType: "app", _source: source, _raw: item };
}
function cvPublic(item) {
  if (!item) return null;
  delete item._source;
  delete item._raw;
  delete item._sourceCount;
  return item;
}
function cvMerge(items) {
  var map = {};
  items.forEach(function (item) {
    if (!item) return;
    var raw = item._raw || {};
    var key = cvIdentityTitle(item.title) + "|" + cvText(raw.vod_year).trim() + "|" + item.mediaType;
    if (!map[key]) { item._sourceCount = 1; map[key] = item; }
    else map[key]._sourceCount += 1;
  });
  return Object.keys(map).map(function (key) {
    var item = map[key];
    if (item._sourceCount > 1) item.description += "\n可用来源：" + item._sourceCount + "个";
    return cvPublic(item);
  });
}
function cvUniqueRaw(items) {
  var seen = {};
  return (Array.isArray(items) ? items : []).filter(function (item) {
    var id = cvText(item && item.vod_id).trim();
    if (!id || seen[id]) return false;
    seen[id] = true;
    return true;
  });
}
async function cvEnrichSourceItems(source, items) {
  var rows = cvUniqueRaw(items);
  var missing = rows.filter(function (item) { return !cvCover(item, source); });
  if (!missing.length) return rows;
  var details = [];
  for (var index = 0; index < missing.length; index += 30) {
    var ids = missing.slice(index, index + 30).map(function (item) { return item.vod_id; }).join(",");
    var payload = await cvSafeGet(source, { ac: "detail", ids: ids });
    details = details.concat(payload.list || []);
  }
  var byId = {};
  details.forEach(function (item) { byId[cvText(item && item.vod_id)] = item; });
  return rows.map(function (item) {
    var detail = byId[cvText(item && item.vod_id)];
    if (!detail) return item;
    var merged = {};
    Object.keys(item).forEach(function (key) { merged[key] = item[key]; });
    Object.keys(detail).forEach(function (key) { merged[key] = detail[key]; });
    return merged;
  });
}
async function cvBrowseSources(sources, paramsFactory) {
  var responses = await cvBatches(sources, function (source) {
    return cvSafeGet(source, paramsFactory(source)).then(function (payload) {
      return cvEnrichSourceItems(source, payload.list || []).then(function (list) { return { source: source, list: list }; });
    });
  }, 8);
  var items = [];
  responses.forEach(function (response) {
    response.list.forEach(function (raw) { var item = cvListItem(raw, response.source); if (item) items.push(item); });
  });
  return cvMerge(items).slice(0, 80);
}
async function loadCineverseHome(params) {
  return cvBrowseSources(CINEVERSE_SOURCES.slice(0, 10), function () { return { ac: "list", pg: cvPage(params && params.page) }; });
}
function cvChannelId(source, channel) {
  var rows = (source.categories && source.categories[channel]) || [];
  return rows.length ? cvText(rows[0].value) : "";
}
async function cvChannel(params, channel) {
  var sources = CINEVERSE_SOURCES.slice(0, 10).filter(function (source) { return !!cvChannelId(source, channel); });
  return cvBrowseSources(sources, function (source) { return { ac: "list", t: cvChannelId(source, channel), pg: cvPage(params && params.page) }; });
}
function loadCineverseMovies(params) { return cvChannel(params, "movie"); }
function loadCineverseSeries(params) { return cvChannel(params, "tv"); }
function loadCineverseVariety(params) { return cvChannel(params, "variety"); }
function loadCineverseAnime(params) { return cvChannel(params, "anime"); }
function loadCineverseShort(params) { return cvChannel(params, "short"); }

async function loadSourceLibrary(params) {
  params = params || {};
  var source = cvSource(cvText(params.source)) || CINEVERSE_SOURCES[0];
  var channel = cvText(params.channel || "home");
  var page = cvPage(params.page);
  var ids = channel === "home" ? [""] : ((source.categories && source.categories[channel]) || []).map(function (row) { return cvText(row.value); }).slice(0, 6);
  if (!ids.length) return [];
  var responses = await Promise.all(ids.map(function (id) { return cvSafeGet(source, { ac: "list", t: id, pg: page }); }));
  var rawItems = [];
  responses.forEach(function (response) { rawItems = rawItems.concat(response.list || []); });
  rawItems = cvUniqueRaw(rawItems).slice(0, 80);
  var enriched = await cvEnrichSourceItems(source, rawItems);
  return enriched.map(function (raw) { return cvListItem(raw, source); }).filter(Boolean).map(cvPublic);
}

async function searchCineverse(params) {
  params = params || {};
  var keyword = cvStrip(params.keyword || params.wd || params.query);
  if (!keyword) return [];
  var queries = cvSearchQueries(keyword);
  var responses = await cvBatches(CINEVERSE_SOURCES, function (source) {
    return Promise.all(queries.map(function (query) {
      var startPage = cvPage(params.page);
      var pages = cvIdentityTitle(query).length <= 4 ? [startPage, startPage + 1] : [startPage];
      return Promise.all(pages.map(function (page) { return cvSafeGet(source, { ac: "detail", wd: query, pg: page }); }));
    })).then(function (payloadGroups) {
      var rows = [];
      payloadGroups.forEach(function (payloads) {
        payloads.forEach(function (payload) { rows = rows.concat(payload.list || []); });
      });
      return cvEnrichSourceItems(source, cvUniqueRaw(rows)).then(function (list) { return { source: source, list: list }; });
    });
  }, 8);
  var items = [];
  responses.forEach(function (response) {
    response.list.forEach(function (raw) { var item = cvListItem(raw, response.source); if (item) items.push(item); });
  });
  return cvMerge(items).slice(0, 80);
}
function cvSeasonNumber(value) {
  var season = cvSeason(value);
  if (!season) return 0;
  if (/^\d+$/.test(season)) return Number(season);
  var map = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10 };
  if (map[season]) return map[season];
  if (/^十[一二三四五六七八九]$/.test(season)) return 10 + map[season.slice(1)];
  if (/^[二三四五六七八九]十$/.test(season)) return map[season.slice(0, 1)] * 10;
  return 0;
}
function cvCandidate(item, keyword, params) {
  if (!item || cvBlocked(item) || !cvPlayLines(item).length) return false;
  var wanted = cvBaseTitle(keyword);
  var title = cvBaseTitle(item.vod_name);
  if (!wanted || !title || (title !== wanted && title.indexOf(wanted) !== 0 && wanted.indexOf(title) !== 0)) return false;
  var type = cvText(params && (params.type || params.mediaType)).toLowerCase();
  if ((type === "tv" || type === "movie") && cvMediaType(item) !== type) return false;
  return true;
}
async function cvFindMatches(keyword, params, sources) {
  var sourcePool = Array.isArray(sources) && sources.length ? sources : CINEVERSE_SOURCES;
  var sourceScope = sourcePool.map(function (source) { return source.slug; }).join(",");
  var cacheKey = [
    cvIdentityTitle(keyword),
    cvText(params && (params.year || params.releaseYear || params.releaseDate)).match(/(?:19|20)\d{2}/) || "",
    Math.floor(Number(params && (params.season || params.seasonNumber))) || cvSeasonNumber(keyword) || 0,
    cvText(params && (params.type || params.mediaType)).toLowerCase(),
    sourceScope
  ].join("|");
  var cached = CV_MATCH_CACHE[cacheKey];
  if (cached && Date.now() - cached.time < CV_MATCH_CACHE_TTL) return cached.rows.slice();
  var queries = cvSearchQueries(keyword);
  var responses = await cvBatches(sourcePool, function (source) {
    return Promise.all(queries.map(function (query) {
      var pages = cvIdentityTitle(query).length <= 4 ? [1, 2] : [1];
      return Promise.all(pages.map(function (page) { return cvSafeGet(source, { ac: "detail", wd: query, pg: page }); }));
    })).then(function (payloadGroups) {
      var list = [];
      payloadGroups.forEach(function (payloads) {
        payloads.forEach(function (payload) { list = list.concat(payload.list || []); });
      });
      return { source: source, list: cvUniqueRaw(list) };
    });
  }, 8);
  var wanted = cvBaseTitle(keyword);
  var rows = [];
  responses.forEach(function (response) {
    response.list.forEach(function (item) {
      if (cvCandidate(item, keyword, params)) rows.push({ source: response.source, item: item });
    });
  });
  if (!rows.length) return [];

  var pool = rows;
  var requestedYear = cvText(params && (params.year || params.releaseYear || params.releaseDate)).trim();
  var yearToken = requestedYear.match(/(?:19|20)\d{2}/);
  requestedYear = yearToken ? yearToken[0] : requestedYear;
  if (requestedYear) {
    var yearMatches = pool.filter(function (row) { return cvText(row.item.vod_year).trim() === requestedYear; });
    if (yearMatches.length) pool = yearMatches;
  }
  var requestedSeason = Math.floor(Number(params && (params.season || params.seasonNumber))) || cvSeasonNumber(keyword);
  if (requestedSeason > 0) {
    var seasonMatches = pool.filter(function (row) {
      return cvSeasonNumber(row.item.vod_name) === requestedSeason || cvSeasonNumber(row.item.vod_remarks) === requestedSeason;
    });
    if (seasonMatches.length) pool = seasonMatches;
  }
  var wantedIdentity = cvIdentityTitle(keyword);
  var wantedEdition = cvTitleEdition(keyword);
  pool = pool.filter(function (row) {
    if (cvBaseTitle(row.item.vod_name) !== wanted) return false;
    var edition = cvTitleEdition(row.item.vod_name);
    return wantedEdition ? edition === wantedEdition : !edition;
  });
  if (!pool.length) return [];
  var exact = pool.filter(function (row) { return cvIdentityTitle(row.item.vod_name) === wantedIdentity; });
  if (exact.length) pool = exact;

  pool.sort(function (a, b) {
    var aExact = cvIdentityTitle(a.item.vod_name) === wantedIdentity ? 0 : 1;
    var bExact = cvIdentityTitle(b.item.vod_name) === wantedIdentity ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return cvIdentityTitle(a.item.vod_name).length - cvIdentityTitle(b.item.vod_name).length;
  });
  var picked = {};
  var result = pool.filter(function (row) {
    var key = row.source.slug + "|" + cvIdentityTitle(row.item.vod_name);
    if (picked[key]) return false;
    picked[key] = true;
    return true;
  });
  if (Object.keys(CV_MATCH_CACHE).length >= 50) CV_MATCH_CACHE = {};
  CV_MATCH_CACHE[cacheKey] = { time: Date.now(), rows: result.slice() };
  return result;
}
async function cvFindPlaybackMatches(keyword, params) {
  var groups = cvPlaybackSourceGroups(params);
  var primaryMatches = await cvFindMatches(keyword, params, groups.primary);
  if (groups.strategy !== "auto" || cvSourceCount(primaryMatches) >= CV_AUTO_MIN_SOURCES) return primaryMatches;
  var fallbackMatches = await cvFindMatches(keyword, params, groups.fallback);
  return cvMergeMatches(primaryMatches.concat(fallbackMatches));
}
function cvEpisodeItems(matches, base) {
  if (base.mediaType === "movie") {
    var hasMovieLine = matches.some(function (match) { return cvPlayLines(match.item).length > 0; });
    return hasMovieLine ? [{ id: base.link + "?episode=1", type: "url", title: "正片",
      description: base.title + "\n起播时加载全部可用电影版本", coverUrl: base.coverUrl, posterPath: base.posterPath,
      mediaType: "movie", episode: 1, link: base.link, playerType: "app" }] : [];
  }
  var items = [];
  var seen = {};
  matches.forEach(function (match) {
    cvPlayLines(match.item).forEach(function (line, index) {
      var episode = cvEpisodeNumber(line.title) || line.index || index + 1;
      var key = episode > 0 ? ("n:" + episode) : ("t:" + cvNormalize(line.title));
      if (seen[key]) return;
      seen[key] = true;
      items.push({ id: base.link + "?episode=" + encodeURIComponent(String(episode)), type: "url", title: line.title,
        description: base.title + "\n起播时加载全部可用 M3U8 线路", coverUrl: base.coverUrl, posterPath: base.posterPath,
        mediaType: base.mediaType, episode: episode, link: base.link, playerType: "app" });
    });
  });
  return items.sort(function (a, b) { return (a.episode || 0) - (b.episode || 0); });
}
async function loadDetail(link) {
  var parsed = cvParseLink(link);
  if (!parsed || !parsed.source) return null;
  var payload = await cvSafeGet(parsed.source, { ac: "detail", ids: parsed.id });
  var raw = (payload.list || [])[0];
  if (!raw) return null;
  var base = cvListItem(raw, parsed.source);
  if (!base) return null;
  base.description = cvDescription(raw, parsed.source, true);
  base.backdropPath = base.coverUrl;
  base.backdropPaths = base.coverUrl ? [base.coverUrl] : [];
  var matches = await cvFindMatches(cvStrip(raw.vod_name), { year: raw.vod_year, type: cvMediaType(raw) });
  base.episodeItems = cvEpisodeItems(matches, base);
  if (!base.episodeItems.length) base.description += "\n\n当前没有匹配到可直接播放的 M3U8。";
  return cvPublic(base);
}
function cvPickLines(lines, params, mediaType) {
  if (!lines.length) return [];
  if (mediaType === "movie") return lines;
  var episodeName = cvStrip(params && params.episodeName);
  if (episodeName) {
    for (var i = 0; i < lines.length; i += 1) if (cvStrip(lines[i].title) === episodeName) return [lines[i]];
  }
  var episode = Math.floor(Number(params && params.episode)) || cvEpisodeNumber(episodeName);
  if (isFinite(episode) && episode > 0) {
    var hasNumberedTitles = false;
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      var number = cvEpisodeNumber(lines[lineIndex].title);
      var range = cvEpisodeRange(lines[lineIndex].title);
      if (number > 0) hasNumberedTitles = true;
      if (number === episode || (range && episode >= range.start && episode <= range.end)) return [lines[lineIndex]];
    }
    return hasNumberedTitles ? [] : (lines[episode - 1] ? [lines[episode - 1]] : []);
  }
  if (episodeName) return [];
  return lines[0] ? [lines[0]] : [];
}
function cvEpisodeRange(value) {
  var title = cvStrip(value);
  var match = title.match(/第\s*0*(\d+)\s*(?:-|~|—|–|至|到)\s*0*(\d+)\s*(?:集|话|期|回)/i);
  if (!match) return null;
  var start = Number(match[1]);
  var end = Number(match[2]);
  return start > 0 && end >= start ? { start: start, end: end } : null;
}
function cvPickLine(lines, params, mediaType) {
  var picked = cvPickLines(lines, params, mediaType || "tv");
  return picked.length ? picked[0] : null;
}
function cvEpisodeNumber(value) {
  var title = cvStrip(value);
  var range = cvEpisodeRange(title);
  if (range) return range.start;
  var match = title.match(/第\s*0*(\d+)\s*(?:集|话|期|回)/i) || title.match(/(?:EP|E)\s*0*(\d+)$/i);
  if (match) return Number(match[1]);
  match = title.match(/^0*(\d{1,4})$/);
  return match ? Number(match[1]) : 0;
}
function cvPlaybackKeywords(params, raw) {
  var type = cvText(params && (params.type || params.mediaType)).toLowerCase();
  var values = raw ? [raw.vod_name] : [];
  if (type === "movie") values = values.concat([params && params.title, params && params.name, params && params.seriesName]);
  else values = values.concat([params && params.seriesName, params && params.title, params && params.name]);
  var seen = {};
  return values.map(cvStrip).filter(function (value) {
    var key = cvNormalize(value);
    if (!key || seen[key]) return false;
    seen[key] = true;
    return true;
  });
}
async function loadResource(params) {
  params = params || {};
  var parsed = cvParseLink(params.link || params.id);
  var raw = null;
  if (parsed && parsed.source) {
    var payload = await cvSafeGet(parsed.source, { ac: "detail", ids: parsed.id });
    raw = (payload.list || [])[0] || null;
    if (!params.year && raw) params.year = raw.vod_year;
    if (!params.type && raw) params.type = cvMediaType(raw);
  }
  var keywords = cvPlaybackKeywords(params, raw);
  if (!keywords.length) return [];
  var keyword = "";
  var matches = [];
  for (var keywordIndex = 0; keywordIndex < keywords.length; keywordIndex += 1) {
    keyword = keywords[keywordIndex];
    matches = await cvFindPlaybackMatches(keyword, params);
    if (matches.length) break;
  }
  if (!matches.length) return [];
  var seen = {};
  var choices = [];
  matches.forEach(function (match) {
    cvPickLines(cvPlayLines(match.item), params, cvMediaType(match.item)).forEach(function (line) {
      if (!line || seen[line.url]) return;
      seen[line.url] = true;
      choices.push({ match: match, line: line, edition: cvLineEdition(line, match.item) });
    });
  });
  var resources = [];
  choices.forEach(function (choice) {
    var match = choice.match;
    var line = choice.line;
    var matchedTitle = cvStrip(match.item.vod_name);
    var variant = cvBaseTitle(matchedTitle) !== cvBaseTitle(keyword) ? (" · " + matchedTitle) : "";
    var playbackName = match.source.playbackName || match.source.name;
    resources.push({ name: playbackName + variant + " · " + line.title,
      description: "来源：" + match.source.name + (variant ? "\n匹配：" + matchedTitle : ""),
      url: line.url, playerType: "app" });
  });
  return resources;
}

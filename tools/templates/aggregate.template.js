/*
 * Rex / ForwardWidgets - 寰宇影源
 * 40站聚合、严格匹配、仅直接 M3U8。运行时不依赖 registry.json 或其他文件。
 */
var CINEVERSE_CONFIG = __AGG_CONFIG__;
var CINEVERSE_SOURCES = CINEVERSE_CONFIG.sources;

function cvText(value) { return value === null || value === undefined ? "" : String(value); }
function cvSourceOptions() { return CINEVERSE_SOURCES.map(function (source) { return { title: source.name, value: source.slug }; }); }
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

var CV_BLOCKED = ["伦理片", "伦理", "福利", "里番", "无码", "有码", "情色", "色情", "成人", "成人视频", "写真", "SWAG"];

function cvJson(value) { return typeof value === "string" ? JSON.parse(value) : (value || {}); }
function cvStrip(value) {
  return cvText(value).replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'").replace(/\s+/g, " ").trim();
}
function cvUrl(value) { var url = cvText(value).trim(); return url.indexOf("//") === 0 ? "https:" + url : url; }
function cvPage(value) { var number = Math.floor(Number(value)); return isFinite(number) && number > 0 ? number : 1; }
function cvSource(slug) {
  for (var i = 0; i < CINEVERSE_SOURCES.length; i += 1) if (CINEVERSE_SOURCES[i].slug === slug) return CINEVERSE_SOURCES[i];
  return null;
}
function cvApiUrl(source, params) {
  var pairs = [];
  Object.keys(params || {}).forEach(function (key) {
    var value = params[key];
    if (value === undefined || value === null || value === "") return;
    pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(value)));
  });
  return source.api + (source.api.indexOf("?") >= 0 ? "&" : "?") + pairs.join("&");
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
  return /剧|连续|电视|动漫|动画|综艺|短剧/i.test(value) ? "tv" : "movie";
}
function cvLink(source, id) { return "cineverse://" + source.slug + "/" + encodeURIComponent(cvText(id)); }
function cvParseLink(link) {
  var match = cvText(link).match(/^cineverse:\/\/([^/]+)\/([^/?#]+)/i);
  return match ? { source: cvSource(match[1]), id: decodeURIComponent(match[2]) } : null;
}
function cvNormalize(value) {
  return cvStrip(value).toLowerCase().replace(/[（(][^）)]*[）)]/g, "").replace(/[\s·•:：,，.。!！?？'\"“”‘’\-_/\\]/g, "");
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
  var cover = cvUrl(item.vod_pic);
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
    var key = cvNormalize(item.title) + "|" + cvText(raw.vod_year).trim() + "|" + item.mediaType;
    if (!map[key]) { item._sourceCount = 1; map[key] = item; }
    else map[key]._sourceCount += 1;
  });
  return Object.keys(map).map(function (key) {
    var item = map[key];
    if (item._sourceCount > 1) item.description += "\n可用来源：" + item._sourceCount + "个";
    return cvPublic(item);
  });
}
async function cvBrowseSources(sources, paramsFactory) {
  var responses = await cvBatches(sources, function (source) {
    return cvSafeGet(source, paramsFactory(source)).then(function (payload) { return { source: source, list: payload.list || [] }; });
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
  var items = [];
  responses.forEach(function (response) {
    (response.list || []).forEach(function (raw) { var item = cvListItem(raw, source); if (item) items.push(item); });
  });
  var seen = {};
  return items.filter(function (item) { if (seen[item.id]) return false; seen[item.id] = true; return true; }).map(cvPublic).slice(0, 80);
}

async function searchCineverse(params) {
  params = params || {};
  var keyword = cvStrip(params.keyword || params.wd || params.query);
  if (!keyword) return [];
  return cvBrowseSources(CINEVERSE_SOURCES, function () { return { ac: "detail", wd: keyword, pg: cvPage(params.page) }; });
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
  var wanted = cvNormalize(keyword);
  var title = cvNormalize(item.vod_name);
  if (!wanted || !title || (title !== wanted && title.indexOf(wanted) !== 0 && wanted.indexOf(title) !== 0)) return false;
  var type = cvText(params && params.type).toLowerCase();
  if ((type === "tv" || type === "movie") && cvMediaType(item) !== type) return false;
  return true;
}
async function cvFindMatches(keyword, params) {
  var responses = await cvBatches(CINEVERSE_SOURCES, function (source) {
    return cvSafeGet(source, { ac: "detail", wd: keyword }).then(function (payload) {
      return { source: source, list: payload.list || [] };
    });
  }, 8);
  var wanted = cvNormalize(keyword);
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
  var exact = pool.filter(function (row) { return cvNormalize(row.item.vod_name) === wanted; });
  if (exact.length) pool = exact;
  if (!exact.length && !requestedYear && !requestedSeason) {
    var years = pool.map(function (row) { return Number(row.item.vod_year); }).filter(function (year) { return isFinite(year) && year >= 1900 && year <= 2100; });
    if (years.length) {
      var earliestYear = Math.min.apply(Math, years);
      pool = pool.filter(function (row) { return Number(row.item.vod_year) === earliestYear; });
    } else {
      var shortest = Math.min.apply(Math, pool.map(function (row) { return cvNormalize(row.item.vod_name).length; }));
      pool = pool.filter(function (row) { return cvNormalize(row.item.vod_name).length === shortest; });
    }
  }
  if (!exact.length && pool.length) {
    var titleStats = {};
    pool.forEach(function (row) {
      var key = cvNormalize(row.item.vod_name);
      if (!titleStats[key]) titleStats[key] = { key: key, length: key.length, count: 0 };
      titleStats[key].count += 1;
    });
    var canonical = Object.keys(titleStats).map(function (key) { return titleStats[key]; }).sort(function (a, b) {
      if (a.length !== b.length) return a.length - b.length;
      return b.count - a.count;
    })[0];
    if (canonical) pool = pool.filter(function (row) { return cvNormalize(row.item.vod_name) === canonical.key; });
  }

  pool.sort(function (a, b) {
    var aExact = cvNormalize(a.item.vod_name) === wanted ? 0 : 1;
    var bExact = cvNormalize(b.item.vod_name) === wanted ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return cvNormalize(a.item.vod_name).length - cvNormalize(b.item.vod_name).length;
  });
  var picked = {};
  return pool.filter(function (row) {
    if (picked[row.source.slug]) return false;
    picked[row.source.slug] = true;
    return true;
  });
}
function cvEpisodeItems(matches, base) {
  var items = [];
  matches.forEach(function (match) {
    cvPlayLines(match.item).forEach(function (line, index) {
      items.push({ id: line.url, type: "url", title: match.source.shortName + " · " + line.title,
        description: "来源：" + match.source.name, coverUrl: base.coverUrl, posterPath: base.posterPath,
        mediaType: cvMediaType(match.item), episode: line.index || index + 1, videoUrl: line.url,
        link: cvLink(match.source, match.item.vod_id), playerType: "app" });
    });
  });
  return items;
}
async function loadDetail(link) {
  var parsed = cvParseLink(link);
  if (!parsed || !parsed.source) return null;
  var payload = await cvGet(parsed.source, { ac: "detail", ids: parsed.id });
  var raw = (payload.list || [])[0];
  if (!raw) return null;
  var base = cvListItem(raw, parsed.source);
  if (!base) return null;
  base.description = cvDescription(raw, parsed.source, true);
  base.backdropPath = base.coverUrl;
  base.backdropPaths = base.coverUrl ? [base.coverUrl] : [];
  var matches = await cvFindMatches(cvStrip(raw.vod_name), { year: raw.vod_year, type: cvMediaType(raw) });
  base.episodeItems = cvEpisodeItems(matches, base);
  if (base.episodeItems.length) base.videoUrl = base.episodeItems[0].videoUrl;
  if (!base.episodeItems.length) base.description += "\n\n当前没有匹配到可直接播放的 M3U8。";
  return cvPublic(base);
}
function cvPickLine(lines, params) {
  var episode = Math.floor(Number(params && params.episode));
  if (isFinite(episode) && episode > 0 && lines[episode - 1]) return lines[episode - 1];
  var episodeName = cvStrip(params && params.episodeName);
  if (episodeName) {
    for (var i = 0; i < lines.length; i += 1) if (cvStrip(lines[i].title) === episodeName) return lines[i];
  }
  return lines[0] || null;
}
async function loadResource(params) {
  params = params || {};
  var direct = [params.videoUrl, params.url, params.id];
  for (var i = 0; i < direct.length; i += 1) {
    var directUrl = cvUrl(direct[i]);
    if (cvM3u8(directUrl)) return [{ name: cvStrip(params.episodeName || params.title) || "M3U8", description: "直接播放", url: directUrl, playerType: "app" }];
  }
  var keyword = cvStrip(params.seriesName || params.title || params.name);
  if (!keyword) {
    var parsed = cvParseLink(params.link || params.id);
    if (parsed && parsed.source) {
      var payload = await cvSafeGet(parsed.source, { ac: "detail", ids: parsed.id });
      var raw = (payload.list || [])[0];
      keyword = cvStrip(raw && raw.vod_name);
      if (!params.year && raw) params.year = raw.vod_year;
      if (!params.type && raw) params.type = cvMediaType(raw);
    }
  }
  if (!keyword) return [];
  var matches = await cvFindMatches(keyword, params);
  var seen = {};
  var resources = [];
  matches.forEach(function (match) {
    var line = cvPickLine(cvPlayLines(match.item), params);
    if (!line || seen[line.url]) return;
    seen[line.url] = true;
    var matchedTitle = cvStrip(match.item.vod_name);
    var variant = cvNormalize(matchedTitle) !== cvNormalize(keyword) ? (" · " + matchedTitle) : "";
    resources.push({ name: match.source.name + variant + " · " + line.title, description: "来源：" + match.source.name + (variant ? "\n匹配：" + matchedTitle : ""),
      url: line.url, playerType: "app" });
  });
  return resources;
}

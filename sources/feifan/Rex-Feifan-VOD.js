/*
 * Rex / ForwardWidgets - 非凡资源
 *
 * 仅使用非凡资源站公开的 ffm3u8 JSON 接口，并只接受直接的 HLS 播放地址。
 * 不包含 Cookie、账号、网页解析器或第三方解析服务。
 */
var WidgetMetadata = {
  id: "rex.feifan.vod",
  title: "非凡资源",
  icon: "https://ffzy.tv/favicon.ico",
  version: "0.1.7",
  requiredVersion: "0.0.1",
  description: "非凡资源网 ffm3u8 专用 JSON 接口：分类、搜索、详情与直接 M3U8 播放",
  author: "ukonic",
  site: "https://ffzy.tv/help/",
  detailCacheDuration: 300,
  modules: [
    {
      id: "loadResource",
      title: "加载非凡播放源",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: []
    },
    {
      id: "feifanVod",
      title: "非凡资源",
      description: "统一入口：最新、电影、剧集、综艺、动漫和短剧细分类",
      functionName: "loadFeifanList",
      cacheDuration: 300,
      params: [
        {
          name: "category",
          title: "分类",
          type: "enumeration",
          value: "0",
          enumOptions: [
            { title: "最新更新", value: "0" },
            { title: "动作片", value: "6" },
            { title: "喜剧片", value: "7" },
            { title: "爱情片", value: "8" },
            { title: "科幻片", value: "9" },
            { title: "恐怖片", value: "10" },
            { title: "剧情片", value: "11" },
            { title: "战争片", value: "12" },
            { title: "纪录片", value: "20" },
            { title: "国产剧", value: "13" },
            { title: "香港剧", value: "14" },
            { title: "韩国剧", value: "15" },
            { title: "欧美剧", value: "16" },
            { title: "台湾剧", value: "21" },
            { title: "日本剧", value: "22" },
            { title: "海外剧", value: "23" },
            { title: "泰国剧", value: "24" },
            { title: "大陆综艺", value: "25" },
            { title: "港台综艺", value: "26" },
            { title: "日韩综艺", value: "27" },
            { title: "欧美综艺", value: "28" },
            { title: "国产动漫", value: "29" },
            { title: "日韩动漫", value: "30" },
            { title: "欧美动漫", value: "31" },
            { title: "港台动漫", value: "32" },
            { title: "海外动漫", value: "33" },
            { title: "短剧", value: "36" }
          ]
        },
        {
          name: "page",
          title: "页码",
          type: "page",
          value: "1"
        }
      ]
    },
    {
      id: "feifanMovies",
      title: "非凡电影",
      functionName: "loadFeifanMovies",
      cacheDuration: 300,
      params: [
        { name: "category", title: "分类", type: "enumeration", value: "all", enumOptions: [
          { title: "全部电影", value: "all" }, { title: "动作片", value: "6" }, { title: "喜剧片", value: "7" },
          { title: "爱情片", value: "8" }, { title: "科幻片", value: "9" }, { title: "恐怖片", value: "10" },
          { title: "剧情片", value: "11" }, { title: "战争片", value: "12" }, { title: "纪录片", value: "20" }
        ] },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "feifanSeries",
      title: "非凡剧集",
      functionName: "loadFeifanSeries",
      cacheDuration: 300,
      params: [
        { name: "category", title: "分类", type: "enumeration", value: "all", enumOptions: [
          { title: "全部剧集", value: "all" }, { title: "国产剧", value: "13" }, { title: "香港剧", value: "14" },
          { title: "韩国剧", value: "15" }, { title: "欧美剧", value: "16" }, { title: "台湾剧", value: "21" },
          { title: "日本剧", value: "22" }, { title: "海外剧", value: "23" }, { title: "泰国剧", value: "24" }
        ] },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "feifanVariety",
      title: "非凡综艺",
      functionName: "loadFeifanVariety",
      cacheDuration: 300,
      params: [
        { name: "category", title: "分类", type: "enumeration", value: "all", enumOptions: [
          { title: "全部综艺", value: "all" }, { title: "大陆综艺", value: "25" }, { title: "港台综艺", value: "26" },
          { title: "日韩综艺", value: "27" }, { title: "欧美综艺", value: "28" }
        ] },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "feifanAnime",
      title: "非凡动漫",
      functionName: "loadFeifanAnime",
      cacheDuration: 300,
      params: [
        { name: "category", title: "分类", type: "enumeration", value: "all", enumOptions: [
          { title: "全部动漫", value: "all" }, { title: "国产动漫", value: "29" }, { title: "日韩动漫", value: "30" },
          { title: "欧美动漫", value: "31" }, { title: "港台动漫", value: "32" }, { title: "海外动漫", value: "33" }
        ] },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "feifanShort",
      title: "非凡短剧",
      functionName: "loadFeifanShort",
      cacheDuration: 300,
      params: [
        { name: "category", title: "分类", type: "enumeration", value: "36", enumOptions: [{ title: "短剧", value: "36" }] },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    }
  ],
  search: {
    title: "搜索非凡资源",
    functionName: "searchFeifan",
    params: [
      {
        name: "keyword",
        title: "关键词",
        type: "input",
        description: "输入影片名称"
      },
      {
        name: "page",
        title: "页码",
        type: "page",
        value: "1"
      }
    ]
  }
};

var FF_API = "https://api.ffzyapi.com/api.php/provide/vod/from/ffm3u8/";
var FF_SITE = "https://ffzy.tv/";
var FF_UA = "Mozilla/5.0 (Rex ForwardWidget; Feifan VOD/0.1.4)";
var FF_BLOCKED_TYPE_IDS = { "34": true };
var FF_BLOCKED_WORDS = [
  "伦理片", "伦理", "福利", "里番", "无码", "有码", "情色", "色情",
  "成人", "成人视频", "写真", "SWAG"
];

function ffText(value) {
  return value === null || value === undefined ? "" : String(value);
}

function ffJson(value) {
  if (typeof value === "string") return JSON.parse(value);
  return value || {};
}

function ffResponseStatus(response) {
  if (!response) return 0;
  var status = response.statusCode;
  if (status === undefined || status === null || status === "") status = response.status;
  status = Number(status);
  return isFinite(status) && status > 0 ? status : 0;
}

function ffStripHtml(value) {
  return ffText(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function ffHttps(value) {
  var url = ffText(value).trim();
  if (url.indexOf("//") === 0) return "https:" + url;
  if (url.indexOf("http://") === 0) return "https://" + url.slice(7);
  return url;
}

function ffPositiveInt(value, fallback) {
  var number = Math.floor(Number(value));
  return isFinite(number) && number > 0 ? number : fallback;
}

function ffUrl(params) {
  var pairs = [];
  Object.keys(params || {}).forEach(function (key) {
    var value = params[key];
    if (value === undefined || value === null || value === "") return;
    pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(value)));
  });
  return FF_API + "?" + pairs.join("&");
}

function ffHeaders() {
  return {
    "User-Agent": FF_UA,
    Accept: "application/json, text/plain, */*",
    Referer: FF_SITE
  };
}

async function ffGet(params) {
  var url = ffUrl(params);
  var response;
  try {
    response = await Widget.http.get(url, { headers: ffHeaders() });
  } catch (error) {
    throw new Error("[FF-NET-001] 非凡接口请求失败：" + (error && error.message ? error.message : error));
  }
  var status = ffResponseStatus(response);
  if (status >= 400) throw new Error("[FF-NET-HTTP] 非凡接口返回 HTTP " + status);
  var result;
  try {
    result = ffJson(response && response.data);
  } catch (error) {
    throw new Error("[FF-DATA-JSON] 非凡接口返回的不是有效 JSON");
  }
  if (Number(result.code) !== 1) {
    throw new Error("[FF-API-001] " + (ffText(result.msg).trim() || "非凡接口返回异常"));
  }
  return result;
}

function ffIsBlocked(item) {
  item = item || {};
  if (FF_BLOCKED_TYPE_IDS[ffText(item.type_id)]) return true;
  var haystack = [
    item.type_name, item.vod_name, item.vod_sub, item.vod_class,
    item.vod_tag, item.vod_remarks
  ].map(ffText).join(" ").toLowerCase();
  for (var i = 0; i < FF_BLOCKED_WORDS.length; i += 1) {
    if (haystack.indexOf(FF_BLOCKED_WORDS[i].toLowerCase()) >= 0) return true;
  }
  return false;
}

function ffMediaType(item) {
  var parent = Number(item && item.type_id_1);
  var type = Number(item && item.type_id);
  return parent === 2 || type === 2 || type === 13 || type === 14 ||
    type === 15 || type === 16 || type === 21 || type === 22 ||
    type === 23 || type === 24 || type === 25 || type === 26 ||
    type === 27 || type === 28 || type === 29 || type === 30 ||
    type === 31 || type === 32 || type === 33 || type === 36 ? "tv" : "movie";
}

function ffVodLink(id) {
  return ffUrl({ ac: "detail", ids: ffText(id) });
}

function ffVodId(link) {
  var value = ffText(link).trim();
  var match = value.match(/^ffzy:\/\/vod\/(\d+)$/i);
  if (match) return match[1];
  if (/^\d+$/.test(value)) return value;
  var query = value.match(/[?&](?:id|ids)=(\d+)/i);
  return query ? query[1] : "";
}

function ffGenreItems(item) {
  var result = [];
  var seen = {};
  var typeId = ffText(item && item.type_id).trim();
  var typeName = ffStripHtml(item && item.type_name);
  if (typeId && typeName && !FF_BLOCKED_TYPE_IDS[typeId]) {
    result.push({ id: typeId, title: typeName });
    seen[typeName] = true;
  }
  ffText(item && item.vod_class).split(/[,，\/]/).forEach(function (name) {
    name = ffStripHtml(name);
    if (!name || seen[name]) return;
    seen[name] = true;
    result.push({ id: typeId || name, title: name });
  });
  return result;
}

function ffDescription(item, includeContent) {
  var lines = [];
  var meta = [];
  var area = ffStripHtml(item && item.vod_area);
  var year = ffStripHtml(item && item.vod_year);
  var lang = ffStripHtml(item && item.vod_lang);
  var remarks = ffStripHtml(item && item.vod_remarks);
  if (year) meta.push(year);
  if (area) meta.push(area);
  if (lang) meta.push(lang);
  if (meta.length) lines.push(meta.join(" · "));
  if (remarks) lines.push("状态：" + remarks);
  var director = ffStripHtml(item && item.vod_director);
  var actor = ffStripHtml(item && item.vod_actor);
  if (director) lines.push("导演：" + director);
  if (actor) lines.push("主演：" + actor);
  if (includeContent) {
    var content = ffStripHtml((item && (item.vod_content || item.vod_blurb)) || "");
    if (content) lines.push("\n简介：\n" + content);
  }
  return lines.join("\n");
}

function ffListItem(item) {
  if (!item || ffIsBlocked(item)) return null;
  var id = ffText(item.vod_id).trim();
  if (!id) return null;
  var cover = ffHttps(item.vod_pic);
  return {
    id: ffVodLink(id),
    type: "url",
    title: ffStripHtml(item.vod_name) || ("非凡影片 " + id),
    description: ffDescription(item, false),
    coverUrl: cover,
    posterPath: cover,
    detailPoster: cover,
    releaseDate: ffStripHtml(item.vod_pubdate || item.vod_year),
    mediaType: ffMediaType(item),
    genreTitle: ffStripHtml(item.type_name || item.vod_class),
    genreItems: ffGenreItems(item),
    rating: ffStripHtml(item.vod_score),
    link: ffVodLink(id),
    playerType: "app"
  };
}

function ffMapList(list) {
  return (Array.isArray(list) ? list : []).map(ffListItem).filter(function (item) {
    return !!item;
  });
}

function ffUniqueItems(items) {
  var seen = {};
  return items.filter(function (item) {
    var key = ffText(item && (item.id || item.link));
    if (!key || seen[key]) return false;
    seen[key] = true;
    return true;
  });
}

function ffIsDirectM3u8(url) {
  var clean = ffText(url).trim();
  return /^https?:\/\//i.test(clean) &&
    (/\.m3u8(?:[?#]|$)/i.test(clean) || /\/index\.m3u8(?:[?#]|$)/i.test(clean));
}

function ffParsePlayLines(item) {
  var sources = ffText(item && item.vod_play_from).split("$$$");
  var groups = ffText(item && item.vod_play_url).split("$$$");
  var m3u8Lines = [];
  for (var groupIndex = 0; groupIndex < groups.length; groupIndex += 1) {
    var source = ffText(sources[groupIndex] || ("线路" + (groupIndex + 1))).trim();
    if (!/ffm3u8/i.test(source)) continue;
    var entries = groups[groupIndex].split("#");
    for (var entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
      var raw = ffText(entries[entryIndex]).trim();
      if (!raw) continue;
      var separator = raw.indexOf("$");
      var title = separator >= 0 ? raw.slice(0, separator) : ("第" + (entryIndex + 1) + "集");
      var url = separator >= 0 ? raw.slice(separator + 1) : raw;
      url = ffHttps(url.trim());
      if (!ffIsDirectM3u8(url)) continue;
      m3u8Lines.push({
        source: source || "直连",
        title: ffStripHtml(title) || ("第" + (entryIndex + 1) + "集"),
        url: url,
        index: entryIndex + 1
      });
    }
  }
  return m3u8Lines;
}

function ffEpisodeItems(item, lines) {
  var cover = ffHttps(item && item.vod_pic);
  var baseTitle = ffStripHtml(item && item.vod_name);
  return lines.map(function (line, index) {
    return {
      id: line.url,
      type: "url",
      title: line.title,
      description: baseTitle + "\n来源：" + line.source,
      coverUrl: cover,
      posterPath: cover,
      mediaType: ffMediaType(item),
      episode: line.index || index + 1,
      videoUrl: line.url,
      link: ffVodLink(item.vod_id),
      playerType: "app"
    };
  });
}

function ffDetailItem(item) {
  var base = ffListItem(item);
  if (!base) return null;
  var lines = ffParsePlayLines(item);
  base.description = ffDescription(item, true);
  base.genreItems = ffGenreItems(item);
  base.backdropPath = base.coverUrl;
  base.backdropPaths = base.coverUrl ? [base.coverUrl] : [];
  base.episodeItems = ffEpisodeItems(item, lines);
  if (base.episodeItems.length) base.videoUrl = base.episodeItems[0].videoUrl;
  if (!base.episodeItems.length) {
    base.description += (base.description ? "\n\n" : "") +
      "[FF-PLAY-EMPTY] 接口当前没有返回可直接播放的 M3U8 地址。";
  }
  return base;
}

async function loadFeifanList(params) {
  params = params || {};
  var category = ffText(params.genreId || params.category || "0").trim();
  if (FF_BLOCKED_TYPE_IDS[category]) return [];
  var query = { ac: "list", pg: ffPositiveInt(params.page, 1) };
  if (category && category !== "0") query.t = category;
  var result = await ffGet(query);
  return ffMapList(result.list);
}

async function loadFeifanChannel(params, categoryIds) {
  params = params || {};
  var category = ffText(params.genreId || params.category || "all").trim();
  if (category && category !== "all") return loadFeifanList({ category: category, page: params.page });
  var page = ffPositiveInt(params.page, 1);
  var results = await Promise.all(categoryIds.map(function (id) {
    return ffGet({ ac: "list", t: id, pg: page }).catch(function () { return { list: [] }; });
  }));
  var items = [];
  results.forEach(function (result) { items = items.concat(ffMapList(result.list)); });
  return ffUniqueItems(items).slice(0, 60);
}

function loadFeifanMovies(params) { return loadFeifanChannel(params, ["6", "7", "8", "9", "10", "11", "12", "20"]); }
function loadFeifanSeries(params) { return loadFeifanChannel(params, ["13", "14", "15", "16", "21", "22", "23", "24"]); }
function loadFeifanVariety(params) { return loadFeifanChannel(params, ["25", "26", "27", "28"]); }
function loadFeifanAnime(params) { return loadFeifanChannel(params, ["29", "30", "31", "32", "33"]); }
function loadFeifanShort(params) { return loadFeifanChannel(params, ["36"]); }

async function searchFeifan(params) {
  params = params || {};
  var keyword = ffStripHtml(params.keyword || params.wd || params.query);
  if (!keyword) return [];
  var result = await ffGet({
    ac: "detail",
    wd: keyword,
    pg: ffPositiveInt(params.page, 1)
  });
  return ffMapList(result.list);
}

async function loadDetail(link) {
  var id = ffVodId(link);
  if (!id) return null;
  var result = await ffGet({ ac: "detail", ids: id });
  var list = Array.isArray(result.list) ? result.list : [];
  for (var i = 0; i < list.length; i += 1) {
    if (ffText(list[i] && list[i].vod_id) === id) return ffDetailItem(list[i]);
  }
  return list.length ? ffDetailItem(list[0]) : null;
}

function ffVideoResource(line) {
  return {
    name: line.title || "非凡 M3U8",
    description: "来源：" + (line.source || "ffm3u8"),
    url: line.url,
    playerType: "app"
  };
}

function ffMatchTitle(value) {
  return ffStripHtml(value)
    .toLowerCase()
    .replace(/[（(][^）)]*[）)]/g, "")
    .replace(/[\s·•:：,，.。!！?？'"“”‘’\-_/\\]/g, "");
}

function ffChineseNumber(value) {
  var number = Number(value);
  var digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  if (!isFinite(number) || number < 1) return "";
  number = Math.floor(number);
  if (number <= 10) return digits[number];
  if (number < 20) return "十" + digits[number - 10];
  if (number < 100) {
    return digits[Math.floor(number / 10)] + "十" + (number % 10 ? digits[number % 10] : "");
  }
  return String(number);
}

function ffPickHomeDetail(list, keyword, params) {
  var wanted = ffMatchTitle(keyword);
  if (!wanted) return null;
  var season = ffPositiveInt(params && params.season, 0);
  var seasonText = season > 0 ? ("第" + ffChineseNumber(season) + "季") : "";
  var wantedSeason = ffMatchTitle(keyword + seasonText);
  var candidates = [];
  (Array.isArray(list) ? list : []).forEach(function (item) {
    if (!item || ffIsBlocked(item) || !ffParsePlayLines(item).length) return;
    var title = ffMatchTitle(item.vod_name);
    if (!title) return;
    if (title !== wanted && (!seasonText || title !== wantedSeason)) return;
    var requestedType = ffText(params && params.type).toLowerCase();
    if ((requestedType === "tv" || requestedType === "movie") && ffMediaType(item) !== requestedType) return;
    var requestedYear = ffText(params && params.year).trim();
    if (requestedYear && ffText(item.vod_year).trim() && ffText(item.vod_year).trim() !== requestedYear) return;
    candidates.push(item);
  });
  return candidates.length === 1 ? candidates[0] : null;
}

async function loadResource(params) {
  params = params || {};
  var directCandidates = [params.videoUrl, params.url, params.id];
  for (var i = 0; i < directCandidates.length; i += 1) {
    var directUrl = ffHttps(directCandidates[i]);
    if (ffIsDirectM3u8(directUrl)) {
      return [ffVideoResource({
        title: ffStripHtml(params.episodeName || params.title) || "非凡 M3U8",
        source: "ffm3u8",
        url: directUrl
      })];
    }
  }

  var vodInput = ffText(params.link).trim();
  if (!vodInput && /api\.ffzyapi\.com\/api\.php\/provide\/vod/i.test(ffText(params.id))) {
    vodInput = ffText(params.id).trim();
  }
  var vodId = ffVodId(vodInput);
  var result;
  var detail;
  if (vodId) {
    result = await ffGet({ ac: "detail", ids: vodId });
    var detailList = Array.isArray(result.list) ? result.list : [];
    detail = detailList.length ? detailList[0] : null;
  } else {
    var keyword = ffStripHtml(params.seriesName || params.title || params.name);
    if (!keyword) return [];
    result = await ffGet({ ac: "detail", wd: keyword });
    detail = ffPickHomeDetail(result.list, keyword, params);
  }
  if (!detail || ffIsBlocked(detail)) return [];
  var lines = ffParsePlayLines(detail);
  if (!lines.length) return [];

  var episodeName = ffStripHtml(params.episodeName);
  if (episodeName) {
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      if (lines[lineIndex].title === episodeName) {
        return [ffVideoResource(lines[lineIndex])];
      }
    }
    return [];
  }

  var episode = ffPositiveInt(params.episode, 0);
  if (episode > 0) {
    var hasNumberedTitles = false;
    for (var numberedIndex = 0; numberedIndex < lines.length; numberedIndex += 1) {
      var number = ffEpisodeNumber(lines[numberedIndex].title);
      if (number > 0) hasNumberedTitles = true;
      if (number === episode) return [ffVideoResource(lines[numberedIndex])];
    }
    return hasNumberedTitles || !lines[episode - 1] ? [] : [ffVideoResource(lines[episode - 1])];
  }

  return [ffVideoResource(lines[0])];
}

function ffEpisodeNumber(value) {
  var title = ffStripHtml(value);
  var match = title.match(/第\s*0*(\d+)\s*(?:集|话|期|回)/i) || title.match(/(?:EP|E)\s*0*(\d+)$/i);
  if (match) return Number(match[1]);
  match = title.match(/^0*(\d{1,4})$/);
  return match ? Number(match[1]) : 0;
}

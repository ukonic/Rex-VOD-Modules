/*
 * Rex / ForwardWidgets - 寰宇影源
 * 40站聚合、严格匹配、仅直接 M3U8。运行时不依赖 registry.json 或其他文件。
 */
var CINEVERSE_CONFIG = {
  "version": "0.1.10",
  "sources": [
    {
      "slug": "feifan",
      "name": "非凡资源",
      "shortName": "非凡",
      "api": "https://api.ffzyapi.com/api.php/provide/vod/from/ffm3u8/",
      "site": "https://api.ffzyapi.com/",
      "priority": 1,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影片",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "记录片",
            "value": "20"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "海外剧",
            "value": "23"
          },
          {
            "title": "泰国剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "综艺片",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "港台综艺",
            "value": "26"
          },
          {
            "title": "日韩综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫片",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "港台动漫",
            "value": "32"
          },
          {
            "title": "海外动漫",
            "value": "33"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "36"
          }
        ]
      }
    },
    {
      "slug": "liangzi",
      "name": "量子资源",
      "shortName": "量子",
      "api": "https://cj.lziapi.com/api.php/provide/vod/",
      "site": "https://cj.lziapi.com/",
      "priority": 2,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影片",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "记录片",
            "value": "20"
          },
          {
            "title": "电影解说",
            "value": "35"
          },
          {
            "title": "预告片",
            "value": "45"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "海外剧",
            "value": "23"
          },
          {
            "title": "泰国剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "综艺片",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "港台综艺",
            "value": "26"
          },
          {
            "title": "日韩综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫片",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "港台动漫",
            "value": "32"
          },
          {
            "title": "海外动漫",
            "value": "33"
          },
          {
            "title": "动画片",
            "value": "49"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "46"
          }
        ]
      }
    },
    {
      "slug": "zuida",
      "name": "最大资源",
      "shortName": "最大",
      "api": "https://api.zuidapi.com/api.php/provide/vod/",
      "site": "https://api.zuidapi.com/",
      "priority": 3,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          },
          {
            "title": "4K电影",
            "value": "62"
          },
          {
            "title": "邵氏电影",
            "value": "70"
          },
          {
            "title": "Netflix电影",
            "value": "71"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          },
          {
            "title": "有声动漫",
            "value": "63"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "54"
          },
          {
            "title": "擦边短剧",
            "value": "73"
          }
        ]
      }
    },
    {
      "slug": "wujin",
      "name": "无尽资源",
      "shortName": "无尽",
      "api": "https://api.wujinapi.com/api.php/provide/vod/",
      "site": "https://api.wujinapi.com/",
      "priority": 4,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "21"
          },
          {
            "title": "悬疑片",
            "value": "32"
          },
          {
            "title": "犯罪片",
            "value": "34"
          },
          {
            "title": "邵氏电影",
            "value": "36"
          },
          {
            "title": "Netflix电影",
            "value": "60"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "台湾剧",
            "value": "15"
          },
          {
            "title": "韩国剧",
            "value": "22"
          },
          {
            "title": "日本剧",
            "value": "23"
          },
          {
            "title": "海外剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "33"
          },
          {
            "title": "港台动漫",
            "value": "42"
          },
          {
            "title": "海外动漫",
            "value": "43"
          },
          {
            "title": "有声动漫",
            "value": "53"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "41"
          },
          {
            "title": "擦边短剧",
            "value": "62"
          }
        ]
      }
    },
    {
      "slug": "modu",
      "name": "魔都资源",
      "shortName": "魔都",
      "api": "https://www.mdzyapi.com/api.php/provide/vod/",
      "site": "https://www.mdzyapi.com/",
      "priority": 5,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "7"
          },
          {
            "title": "动作片",
            "value": "10"
          },
          {
            "title": "喜剧片",
            "value": "11"
          },
          {
            "title": "爱情片",
            "value": "12"
          },
          {
            "title": "科幻片",
            "value": "13"
          },
          {
            "title": "恐怖片",
            "value": "14"
          },
          {
            "title": "剧情片",
            "value": "15"
          },
          {
            "title": "战争片",
            "value": "16"
          },
          {
            "title": "惊悚片",
            "value": "17"
          },
          {
            "title": "家庭片",
            "value": "18"
          },
          {
            "title": "古装片",
            "value": "19"
          },
          {
            "title": "历史片",
            "value": "20"
          },
          {
            "title": "悬疑片",
            "value": "21"
          },
          {
            "title": "犯罪片",
            "value": "22"
          },
          {
            "title": "灾难片",
            "value": "23"
          },
          {
            "title": "记录片",
            "value": "24"
          },
          {
            "title": "短片",
            "value": "25"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "8"
          },
          {
            "title": "国产剧",
            "value": "26"
          },
          {
            "title": "香港剧",
            "value": "27"
          },
          {
            "title": "韩国剧",
            "value": "28"
          },
          {
            "title": "欧美剧",
            "value": "29"
          },
          {
            "title": "台湾剧",
            "value": "30"
          },
          {
            "title": "日本剧",
            "value": "31"
          },
          {
            "title": "海外剧",
            "value": "32"
          },
          {
            "title": "泰国剧",
            "value": "33"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "9"
          },
          {
            "title": "大陆综艺",
            "value": "34"
          },
          {
            "title": "港台综艺",
            "value": "35"
          },
          {
            "title": "日韩综艺",
            "value": "36"
          },
          {
            "title": "欧美综艺",
            "value": "37"
          }
        ],
        "anime": [
          {
            "title": "国产动漫",
            "value": "1"
          },
          {
            "title": "日韩动漫",
            "value": "2"
          },
          {
            "title": "欧美动漫",
            "value": "3"
          },
          {
            "title": "港台动漫",
            "value": "4"
          },
          {
            "title": "动漫电影",
            "value": "5"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "38"
          }
        ]
      }
    },
    {
      "slug": "zy360",
      "name": "360资源",
      "shortName": "360",
      "api": "https://360zy.com/api.php/provide/vod/",
      "site": "https://360zy.com/",
      "priority": 6,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "惊悚片",
            "value": "20"
          },
          {
            "title": "家庭篇",
            "value": "21"
          },
          {
            "title": "古装片",
            "value": "22"
          },
          {
            "title": "历史片",
            "value": "23"
          },
          {
            "title": "悬疑片",
            "value": "24"
          },
          {
            "title": "犯罪片",
            "value": "25"
          },
          {
            "title": "灾难片",
            "value": "26"
          },
          {
            "title": "纪录片",
            "value": "27"
          },
          {
            "title": "短片",
            "value": "28"
          },
          {
            "title": "未分类",
            "value": "43"
          },
          {
            "title": "西部片",
            "value": "45"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "30"
          },
          {
            "title": "日本剧",
            "value": "31"
          },
          {
            "title": "海外剧",
            "value": "32"
          },
          {
            "title": "泰国剧",
            "value": "33"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "34"
          },
          {
            "title": "港台综艺",
            "value": "35"
          },
          {
            "title": "日韩综艺",
            "value": "36"
          },
          {
            "title": "欧美综艺",
            "value": "37"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动画片",
            "value": "29"
          },
          {
            "title": "国产动漫",
            "value": "38"
          },
          {
            "title": "欧美动漫",
            "value": "39"
          },
          {
            "title": "日韩动漫",
            "value": "40"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "46"
          },
          {
            "title": "现代都市",
            "value": "47"
          },
          {
            "title": "脑洞悬疑",
            "value": "48"
          },
          {
            "title": "年代穿越",
            "value": "49"
          },
          {
            "title": "古装仙侠",
            "value": "50"
          },
          {
            "title": "反转爽剧",
            "value": "51"
          },
          {
            "title": "女频恋爱",
            "value": "52"
          },
          {
            "title": "成长逆袭",
            "value": "53"
          }
        ]
      }
    },
    {
      "slug": "dytt",
      "name": "电影天堂资源",
      "shortName": "电影天堂",
      "api": "https://caiji.dyttzyapi.com/api.php/provide/vod/",
      "site": "https://caiji.dyttzyapi.com/",
      "priority": 7,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影片",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "记录片",
            "value": "20"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "海外剧",
            "value": "23"
          },
          {
            "title": "泰国剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "综艺片",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "港台综艺",
            "value": "26"
          },
          {
            "title": "日韩综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫片",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "港台动漫",
            "value": "32"
          },
          {
            "title": "海外动漫",
            "value": "33"
          },
          {
            "title": "动画片",
            "value": "37"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "36"
          }
        ]
      }
    },
    {
      "slug": "guangsu",
      "name": "光速资源",
      "shortName": "光速",
      "api": "https://api.guangsuapi.com/api.php/provide/vod/",
      "site": "https://api.guangsuapi.com/",
      "priority": 8,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "剧情片",
            "value": "10"
          },
          {
            "title": "恐怖片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "大陆剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "港澳剧",
            "value": "15"
          },
          {
            "title": "韩剧",
            "value": "16"
          },
          {
            "title": "日剧",
            "value": "21"
          },
          {
            "title": "台湾剧",
            "value": "22"
          },
          {
            "title": "泰剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "37"
          },
          {
            "title": "日韩综艺",
            "value": "38"
          },
          {
            "title": "港台综艺",
            "value": "39"
          },
          {
            "title": "欧美综艺",
            "value": "40"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动漫电影",
            "value": "20"
          },
          {
            "title": "中国动漫",
            "value": "41"
          },
          {
            "title": "日本动漫",
            "value": "42"
          },
          {
            "title": "欧美动漫",
            "value": "43"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "31"
          },
          {
            "title": "古装仙侠",
            "value": "44"
          },
          {
            "title": "现代都市",
            "value": "45"
          },
          {
            "title": "穿越年代",
            "value": "46"
          },
          {
            "title": "言情总裁",
            "value": "47"
          },
          {
            "title": "重生民国",
            "value": "48"
          },
          {
            "title": "反转爽剧",
            "value": "49"
          },
          {
            "title": "脑洞悬疑",
            "value": "50"
          },
          {
            "title": "擦边短剧",
            "value": "51"
          },
          {
            "title": "AI漫剧",
            "value": "52"
          }
        ]
      }
    },
    {
      "slug": "baofeng",
      "name": "暴风资源",
      "shortName": "暴风",
      "api": "https://bfzyapi.com/api.php/provide/vod/",
      "site": "https://bfzyapi.com/",
      "priority": 9,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影片",
            "value": "20"
          },
          {
            "title": "动作片",
            "value": "21"
          },
          {
            "title": "喜剧片",
            "value": "22"
          },
          {
            "title": "恐怖片",
            "value": "23"
          },
          {
            "title": "科幻片",
            "value": "24"
          },
          {
            "title": "爱情片",
            "value": "25"
          },
          {
            "title": "剧情片",
            "value": "26"
          },
          {
            "title": "战争片",
            "value": "27"
          },
          {
            "title": "纪录片",
            "value": "28"
          },
          {
            "title": "理论片",
            "value": "29"
          },
          {
            "title": "电影解说",
            "value": "51"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "30"
          },
          {
            "title": "国产剧",
            "value": "31"
          },
          {
            "title": "欧美剧",
            "value": "32"
          },
          {
            "title": "香港剧",
            "value": "33"
          },
          {
            "title": "韩国剧",
            "value": "34"
          },
          {
            "title": "台湾剧",
            "value": "35"
          },
          {
            "title": "日本剧",
            "value": "36"
          },
          {
            "title": "海外剧",
            "value": "37"
          },
          {
            "title": "泰国剧",
            "value": "38"
          }
        ],
        "variety": [
          {
            "title": "综艺片",
            "value": "45"
          },
          {
            "title": "大陆综艺",
            "value": "46"
          },
          {
            "title": "港台综艺",
            "value": "47"
          },
          {
            "title": "日韩综艺",
            "value": "48"
          },
          {
            "title": "欧美综艺",
            "value": "49"
          }
        ],
        "anime": [
          {
            "title": "动漫片",
            "value": "39"
          },
          {
            "title": "国产动漫",
            "value": "40"
          },
          {
            "title": "日韩动漫",
            "value": "41"
          },
          {
            "title": "欧美动漫",
            "value": "42"
          },
          {
            "title": "港台动漫",
            "value": "43"
          },
          {
            "title": "海外动漫",
            "value": "44"
          },
          {
            "title": "动画片",
            "value": "50"
          }
        ],
        "short": [
          {
            "title": "短剧大全",
            "value": "58"
          },
          {
            "title": "重生民国",
            "value": "59"
          },
          {
            "title": "穿越年代",
            "value": "60"
          },
          {
            "title": "现代言情",
            "value": "61"
          },
          {
            "title": "反转爽文",
            "value": "62"
          },
          {
            "title": "女恋总裁",
            "value": "63"
          },
          {
            "title": "闪婚离婚",
            "value": "64"
          },
          {
            "title": "都市脑洞",
            "value": "65"
          },
          {
            "title": "古装仙侠",
            "value": "66"
          },
          {
            "title": "AI漫剧",
            "value": "68"
          }
        ]
      }
    },
    {
      "slug": "hongniu",
      "name": "红牛资源",
      "shortName": "红牛",
      "api": "https://www.hongniuzy2.com/api.php/provide/vod/",
      "site": "https://www.hongniuzy2.com/",
      "priority": 10,
      "tier": "S",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "5"
          },
          {
            "title": "喜剧片",
            "value": "6"
          },
          {
            "title": "爱情片",
            "value": "7"
          },
          {
            "title": "科幻片",
            "value": "8"
          },
          {
            "title": "恐怖片",
            "value": "9"
          },
          {
            "title": "剧情片",
            "value": "10"
          },
          {
            "title": "战争片",
            "value": "11"
          },
          {
            "title": "纪录片",
            "value": "19"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "12"
          },
          {
            "title": "欧美剧",
            "value": "15"
          },
          {
            "title": "台湾剧",
            "value": "16"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "39"
          },
          {
            "title": "日韩综艺",
            "value": "40"
          },
          {
            "title": "港台综艺",
            "value": "41"
          },
          {
            "title": "欧美综艺",
            "value": "42"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动漫电影",
            "value": "20"
          },
          {
            "title": "中国动漫",
            "value": "36"
          },
          {
            "title": "日本动漫",
            "value": "37"
          },
          {
            "title": "欧美动漫",
            "value": "38"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "30"
          },
          {
            "title": "擦边短剧",
            "value": "50"
          }
        ]
      }
    },
    {
      "slug": "jisu",
      "name": "极速资源",
      "shortName": "极速",
      "api": "https://jszyapi.com/api.php/provide/vod/",
      "site": "https://jszyapi.com/",
      "priority": 11,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "2"
          },
          {
            "title": "动作片",
            "value": "9"
          },
          {
            "title": "爱情片",
            "value": "10"
          },
          {
            "title": "喜剧片",
            "value": "11"
          },
          {
            "title": "科幻片",
            "value": "12"
          },
          {
            "title": "恐怖片",
            "value": "13"
          },
          {
            "title": "剧情片",
            "value": "14"
          },
          {
            "title": "战争片",
            "value": "15"
          },
          {
            "title": "记录片",
            "value": "16"
          },
          {
            "title": "灾难片",
            "value": "34"
          },
          {
            "title": "悬疑片",
            "value": "35"
          },
          {
            "title": "犯罪片",
            "value": "36"
          },
          {
            "title": "奇幻片",
            "value": "37"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "1"
          },
          {
            "title": "欧美剧",
            "value": "3"
          },
          {
            "title": "香港剧",
            "value": "4"
          },
          {
            "title": "韩剧",
            "value": "5"
          },
          {
            "title": "日剧",
            "value": "6"
          },
          {
            "title": "马泰剧",
            "value": "7"
          },
          {
            "title": "内地剧",
            "value": "20"
          },
          {
            "title": "台湾剧",
            "value": "28"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "27"
          },
          {
            "title": "大陆综艺",
            "value": "30"
          },
          {
            "title": "日韩综艺",
            "value": "31"
          },
          {
            "title": "港台综艺",
            "value": "32"
          },
          {
            "title": "欧美综艺",
            "value": "33"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "17"
          },
          {
            "title": "动画片",
            "value": "23"
          },
          {
            "title": "中国动漫",
            "value": "24"
          },
          {
            "title": "日本动漫",
            "value": "25"
          },
          {
            "title": "欧美动漫",
            "value": "26"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "38"
          },
          {
            "title": "古装仙侠",
            "value": "45"
          },
          {
            "title": "现代都市",
            "value": "46"
          },
          {
            "title": "穿越年代",
            "value": "47"
          },
          {
            "title": "言情总裁",
            "value": "48"
          },
          {
            "title": "重生民国",
            "value": "49"
          },
          {
            "title": "反转爽剧",
            "value": "50"
          },
          {
            "title": "脑洞悬疑",
            "value": "52"
          },
          {
            "title": "擦边短剧",
            "value": "53"
          },
          {
            "title": "AI漫剧",
            "value": "54"
          }
        ]
      }
    },
    {
      "slug": "ruyi",
      "name": "如意资源",
      "shortName": "如意",
      "api": "https://cj.rycjapi.com/api.php/provide/vod/",
      "site": "https://cj.rycjapi.com/",
      "priority": 12,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影片",
            "value": "1"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "记录片",
            "value": "20"
          },
          {
            "title": "电影解说",
            "value": "35"
          },
          {
            "title": "预告片",
            "value": "45"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "海外剧",
            "value": "23"
          },
          {
            "title": "泰国剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "综艺片",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "港台综艺",
            "value": "26"
          },
          {
            "title": "日韩综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫片",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "港台动漫",
            "value": "32"
          },
          {
            "title": "海外动漫",
            "value": "33"
          },
          {
            "title": "动画电影",
            "value": "47"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "46"
          }
        ]
      }
    },
    {
      "slug": "ikun",
      "name": "IKUN资源",
      "shortName": "IKUN",
      "api": "https://ikunzyapi.com/api.php/provide/vod/",
      "site": "https://ikunzyapi.com/",
      "priority": 13,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "惊悚片",
            "value": "13"
          },
          {
            "title": "家庭片",
            "value": "14"
          },
          {
            "title": "古装片",
            "value": "15"
          },
          {
            "title": "历史片",
            "value": "16"
          },
          {
            "title": "悬疑片",
            "value": "17"
          },
          {
            "title": "犯罪片",
            "value": "18"
          },
          {
            "title": "灾难片",
            "value": "19"
          },
          {
            "title": "记录片",
            "value": "20"
          },
          {
            "title": "短片",
            "value": "21"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "23"
          },
          {
            "title": "香港剧",
            "value": "24"
          },
          {
            "title": "韩国剧",
            "value": "25"
          },
          {
            "title": "欧美剧",
            "value": "26"
          },
          {
            "title": "台湾剧",
            "value": "27"
          },
          {
            "title": "日本剧",
            "value": "28"
          },
          {
            "title": "海外剧",
            "value": "29"
          },
          {
            "title": "泰国剧",
            "value": "30"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "31"
          },
          {
            "title": "港台综艺",
            "value": "32"
          },
          {
            "title": "日韩综艺",
            "value": "33"
          },
          {
            "title": "欧美综艺",
            "value": "34"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动画片",
            "value": "22"
          },
          {
            "title": "国产动漫",
            "value": "35"
          },
          {
            "title": "欧美动漫",
            "value": "36"
          },
          {
            "title": "日本动漫",
            "value": "37"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "45"
          }
        ]
      }
    },
    {
      "slug": "youku",
      "name": "优酷资源",
      "shortName": "优酷",
      "api": "https://api.ukuapi.com/api.php/provide/vod/",
      "site": "https://api.ukuapi.com/",
      "priority": 14,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "奇幻片",
            "value": "33"
          },
          {
            "title": "犯罪片",
            "value": "34"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "港澳剧",
            "value": "14"
          },
          {
            "title": "日剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "21"
          },
          {
            "title": "韩剧",
            "value": "22"
          },
          {
            "title": "泰剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动漫电影",
            "value": "20"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "32"
          }
        ]
      }
    },
    {
      "slug": "suoni",
      "name": "索尼资源",
      "shortName": "索尼",
      "api": "https://suoniapi.com/api.php/provide/vod/",
      "site": "https://suoniapi.com/",
      "priority": 15,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          },
          {
            "title": "4K电影",
            "value": "62"
          },
          {
            "title": "邵氏电影",
            "value": "70"
          },
          {
            "title": "Netflix电影",
            "value": "71"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          },
          {
            "title": "有声动漫",
            "value": "63"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "54"
          },
          {
            "title": "擦边短剧",
            "value": "73"
          }
        ]
      }
    },
    {
      "slug": "niuniu",
      "name": "牛牛资源",
      "shortName": "牛牛",
      "api": "https://api.niuniuzy.me/api.php/provide/vod/",
      "site": "https://api.niuniuzy.me/",
      "priority": 16,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          },
          {
            "title": "4K电影",
            "value": "62"
          },
          {
            "title": "邵氏电影",
            "value": "70"
          },
          {
            "title": "Netflix电影",
            "value": "71"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          },
          {
            "title": "有声动漫",
            "value": "63"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "54"
          },
          {
            "title": "擦边短剧",
            "value": "73"
          }
        ]
      }
    },
    {
      "slug": "shandian",
      "name": "闪电资源",
      "shortName": "闪电",
      "api": "https://sdzyapi.com/api.php/provide/vod/",
      "site": "https://sdzyapi.com/",
      "priority": 17,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          },
          {
            "title": "4K电影",
            "value": "62"
          },
          {
            "title": "邵氏电影",
            "value": "70"
          },
          {
            "title": "Netflix电影",
            "value": "71"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          },
          {
            "title": "有声动漫",
            "value": "63"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "54"
          },
          {
            "title": "擦边短剧",
            "value": "74"
          }
        ]
      }
    },
    {
      "slug": "ok",
      "name": "OK资源",
      "shortName": "OK",
      "api": "https://api.okzyw.net/api.php/provide/vod/",
      "site": "https://api.okzyw.net/",
      "priority": 18,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          },
          {
            "title": "4K电影",
            "value": "62"
          },
          {
            "title": "邵氏电影",
            "value": "70"
          },
          {
            "title": "Netflix电影",
            "value": "72"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          },
          {
            "title": "有声动漫",
            "value": "63"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "54"
          },
          {
            "title": "擦边短剧",
            "value": "73"
          }
        ]
      }
    },
    {
      "slug": "maoyan",
      "name": "猫眼资源",
      "shortName": "猫眼",
      "api": "https://api.maoyanapi.top/api.php/provide/vod/",
      "site": "https://api.maoyanapi.top/",
      "priority": 19,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "惊悚片",
            "value": "20"
          },
          {
            "title": "家庭篇",
            "value": "21"
          },
          {
            "title": "古装片",
            "value": "22"
          },
          {
            "title": "历史片",
            "value": "23"
          },
          {
            "title": "悬疑片",
            "value": "24"
          },
          {
            "title": "犯罪片",
            "value": "25"
          },
          {
            "title": "灾难片",
            "value": "26"
          },
          {
            "title": "纪录片",
            "value": "27"
          },
          {
            "title": "短片",
            "value": "28"
          },
          {
            "title": "未分类",
            "value": "43"
          },
          {
            "title": "西部片",
            "value": "45"
          },
          {
            "title": "奇幻片",
            "value": "54"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "30"
          },
          {
            "title": "日本剧",
            "value": "31"
          },
          {
            "title": "海外剧",
            "value": "32"
          },
          {
            "title": "泰国剧",
            "value": "33"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "34"
          },
          {
            "title": "港台综艺",
            "value": "35"
          },
          {
            "title": "日韩综艺",
            "value": "36"
          },
          {
            "title": "欧美综艺",
            "value": "37"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动画片",
            "value": "29"
          },
          {
            "title": "国产动漫",
            "value": "38"
          },
          {
            "title": "欧美动漫",
            "value": "39"
          },
          {
            "title": "日韩动漫",
            "value": "40"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "46"
          },
          {
            "title": "短剧现代都市",
            "value": "47"
          },
          {
            "title": "短剧脑洞悬疑",
            "value": "48"
          },
          {
            "title": "短剧年代穿越",
            "value": "49"
          },
          {
            "title": "短剧古装仙侠",
            "value": "50"
          },
          {
            "title": "短剧反转爽剧",
            "value": "51"
          },
          {
            "title": "短剧女频恋爱",
            "value": "52"
          },
          {
            "title": "短剧成长逆袭",
            "value": "53"
          }
        ]
      }
    },
    {
      "slug": "kuaiche",
      "name": "快车资源",
      "shortName": "快车",
      "api": "https://caiji.kuaichezy.org/api.php/provide/vod/",
      "site": "https://caiji.kuaichezy.org/",
      "priority": 20,
      "tier": "A",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          },
          {
            "title": "4K电影",
            "value": "62"
          },
          {
            "title": "邵氏电影",
            "value": "70"
          },
          {
            "title": "Netflix电影",
            "value": "71"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          },
          {
            "title": "有声动漫",
            "value": "63"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "54"
          },
          {
            "title": "擦边短剧",
            "value": "73"
          }
        ]
      }
    },
    {
      "slug": "tianya",
      "name": "天涯资源",
      "shortName": "天涯",
      "api": "https://tyyszyapi.com/api.php/provide/vod/",
      "site": "https://tyyszyapi.com/",
      "priority": 21,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "日本剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "18"
          },
          {
            "title": "泰国剧",
            "value": "19"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "54"
          },
          {
            "title": "ai短剧",
            "value": "73"
          }
        ]
      }
    },
    {
      "slug": "huya",
      "name": "虎牙资源",
      "shortName": "虎牙",
      "api": "https://www.huyaapi.com/api.php/provide/vod/",
      "site": "https://www.huyaapi.com/",
      "priority": 22,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "2"
          },
          {
            "title": "动作片",
            "value": "9"
          },
          {
            "title": "爱情片",
            "value": "10"
          },
          {
            "title": "喜剧片",
            "value": "11"
          },
          {
            "title": "科幻片",
            "value": "12"
          },
          {
            "title": "恐怖片",
            "value": "13"
          },
          {
            "title": "剧情片",
            "value": "14"
          },
          {
            "title": "战争片",
            "value": "15"
          },
          {
            "title": "记录片",
            "value": "16"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "1"
          },
          {
            "title": "欧美剧",
            "value": "3"
          },
          {
            "title": "香港剧",
            "value": "4"
          },
          {
            "title": "韩剧",
            "value": "5"
          },
          {
            "title": "日剧",
            "value": "6"
          },
          {
            "title": "马泰剧",
            "value": "7"
          },
          {
            "title": "内地剧",
            "value": "20"
          },
          {
            "title": "台湾剧",
            "value": "28"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "27"
          },
          {
            "title": "大陆综艺",
            "value": "38"
          },
          {
            "title": "日韩综艺",
            "value": "39"
          },
          {
            "title": "港台综艺",
            "value": "40"
          },
          {
            "title": "欧美综艺",
            "value": "41"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "17"
          },
          {
            "title": "动画片",
            "value": "23"
          },
          {
            "title": "中国动漫",
            "value": "24"
          },
          {
            "title": "日本动漫",
            "value": "25"
          },
          {
            "title": "欧美动漫",
            "value": "26"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "30"
          },
          {
            "title": "古装仙侠",
            "value": "42"
          },
          {
            "title": "现代都市",
            "value": "43"
          },
          {
            "title": "穿越年代",
            "value": "44"
          },
          {
            "title": "言情总裁",
            "value": "45"
          },
          {
            "title": "重生民国",
            "value": "46"
          },
          {
            "title": "反转爽剧",
            "value": "47"
          },
          {
            "title": "脑洞悬疑",
            "value": "48"
          },
          {
            "title": "擦边短剧",
            "value": "49"
          },
          {
            "title": "AI漫剧",
            "value": "50"
          }
        ]
      }
    },
    {
      "slug": "xinlang",
      "name": "新浪资源",
      "shortName": "新浪",
      "api": "http://api.xinlangapi.com/xinlangapi.php/provide/vod/",
      "site": "http://api.xinlangapi.com/",
      "priority": 23,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "纪录片",
            "value": "5"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "爱情片",
            "value": "7"
          },
          {
            "title": "科幻片",
            "value": "8"
          },
          {
            "title": "战争片",
            "value": "9"
          },
          {
            "title": "剧情片",
            "value": "10"
          },
          {
            "title": "恐怖片",
            "value": "11"
          },
          {
            "title": "喜剧片",
            "value": "12"
          },
          {
            "title": "灾难片",
            "value": "41"
          },
          {
            "title": "悬疑片",
            "value": "42"
          },
          {
            "title": "犯罪片",
            "value": "43"
          },
          {
            "title": "奇幻片",
            "value": "44"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "大陆剧",
            "value": "13"
          },
          {
            "title": "港澳剧",
            "value": "14"
          },
          {
            "title": "台湾剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "韩剧",
            "value": "18"
          },
          {
            "title": "日剧",
            "value": "20"
          },
          {
            "title": "泰剧",
            "value": "21"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "4"
          },
          {
            "title": "大陆综艺",
            "value": "45"
          },
          {
            "title": "日韩综艺",
            "value": "46"
          },
          {
            "title": "港台综艺",
            "value": "47"
          },
          {
            "title": "欧美综艺",
            "value": "48"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "3"
          },
          {
            "title": "动画片",
            "value": "17"
          },
          {
            "title": "中国动漫",
            "value": "38"
          },
          {
            "title": "日本动漫",
            "value": "39"
          },
          {
            "title": "欧美动漫",
            "value": "40"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "24"
          },
          {
            "title": "古装仙侠",
            "value": "49"
          },
          {
            "title": "现代都市",
            "value": "50"
          },
          {
            "title": "穿越年代",
            "value": "51"
          },
          {
            "title": "言情总裁",
            "value": "52"
          },
          {
            "title": "重生民国",
            "value": "53"
          },
          {
            "title": "反转爽剧",
            "value": "54"
          },
          {
            "title": "脑洞悬疑",
            "value": "55"
          },
          {
            "title": "擦边短剧",
            "value": "56"
          },
          {
            "title": "AI漫剧",
            "value": "57"
          }
        ]
      }
    },
    {
      "slug": "haohua",
      "name": "豪华资源",
      "shortName": "豪华",
      "api": "https://hhzyapi.com/api.php/provide/vod/",
      "site": "https://hhzyapi.com/",
      "priority": 24,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "2"
          },
          {
            "title": "动作片",
            "value": "9"
          },
          {
            "title": "爱情片",
            "value": "10"
          },
          {
            "title": "喜剧片",
            "value": "11"
          },
          {
            "title": "科幻片",
            "value": "12"
          },
          {
            "title": "恐怖片",
            "value": "13"
          },
          {
            "title": "剧情片",
            "value": "14"
          },
          {
            "title": "战争片",
            "value": "15"
          },
          {
            "title": "记录片",
            "value": "16"
          },
          {
            "title": "灾难片",
            "value": "34"
          },
          {
            "title": "悬疑片",
            "value": "35"
          },
          {
            "title": "犯罪片",
            "value": "36"
          },
          {
            "title": "奇幻片",
            "value": "37"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "1"
          },
          {
            "title": "欧美剧",
            "value": "3"
          },
          {
            "title": "香港剧",
            "value": "4"
          },
          {
            "title": "韩剧",
            "value": "5"
          },
          {
            "title": "日剧",
            "value": "6"
          },
          {
            "title": "马泰剧",
            "value": "7"
          },
          {
            "title": "内地剧",
            "value": "20"
          },
          {
            "title": "台湾剧",
            "value": "28"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "27"
          },
          {
            "title": "大陆综艺",
            "value": "30"
          },
          {
            "title": "日韩综艺",
            "value": "31"
          },
          {
            "title": "港台综艺",
            "value": "32"
          },
          {
            "title": "欧美综艺",
            "value": "33"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "17"
          },
          {
            "title": "动画片",
            "value": "23"
          },
          {
            "title": "中国动漫",
            "value": "24"
          },
          {
            "title": "日本动漫",
            "value": "25"
          },
          {
            "title": "欧美动漫",
            "value": "26"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "38"
          },
          {
            "title": "古装仙侠",
            "value": "45"
          },
          {
            "title": "现代都市",
            "value": "46"
          },
          {
            "title": "穿越年代",
            "value": "47"
          },
          {
            "title": "言情总裁",
            "value": "48"
          },
          {
            "title": "重生民国",
            "value": "49"
          },
          {
            "title": "反转爽剧",
            "value": "50"
          },
          {
            "title": "脑洞悬疑",
            "value": "51"
          },
          {
            "title": "擦边短剧",
            "value": "52"
          },
          {
            "title": "AI漫剧",
            "value": "53"
          }
        ]
      }
    },
    {
      "slug": "aidan",
      "name": "爱蛋资源",
      "shortName": "爱蛋",
      "api": "https://lovedan.net/api.php/provide/vod/",
      "site": "https://lovedan.net/",
      "priority": 25,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "犯罪片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "剧情片",
            "value": "21"
          },
          {
            "title": "纪录片",
            "value": "22"
          },
          {
            "title": "网络电影",
            "value": "70"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "海外剧",
            "value": "30"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "日韩综艺",
            "value": "23"
          },
          {
            "title": "港台综艺",
            "value": "24"
          },
          {
            "title": "欧美综艺",
            "value": "25"
          },
          {
            "title": "大陆综艺",
            "value": "31"
          },
          {
            "title": "其他综艺",
            "value": "71"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动画电影",
            "value": "20"
          },
          {
            "title": "国产动漫",
            "value": "26"
          },
          {
            "title": "日韩动漫",
            "value": "27"
          },
          {
            "title": "欧美动漫",
            "value": "28"
          },
          {
            "title": "海外动漫",
            "value": "29"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "63"
          }
        ]
      }
    },
    {
      "slug": "yinghua",
      "name": "樱花资源",
      "shortName": "樱花",
      "api": "https://m3u8.apiyhzy.com/api.php/provide/vod/",
      "site": "https://m3u8.apiyhzy.com/",
      "priority": 26,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "犯罪片",
            "value": "20"
          },
          {
            "title": "纪录片",
            "value": "21"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "台湾剧",
            "value": "15"
          },
          {
            "title": "韩国剧",
            "value": "16"
          },
          {
            "title": "日本剧",
            "value": "23"
          },
          {
            "title": "欧美剧",
            "value": "24"
          },
          {
            "title": "海外剧",
            "value": "25"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "26"
          },
          {
            "title": "日韩综艺",
            "value": "27"
          },
          {
            "title": "港台综艺",
            "value": "28"
          },
          {
            "title": "欧美综艺",
            "value": "29"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动画电影",
            "value": "22"
          },
          {
            "title": "国产动漫",
            "value": "30"
          },
          {
            "title": "日本动漫",
            "value": "31"
          },
          {
            "title": "欧美动漫",
            "value": "32"
          },
          {
            "title": "海外动漫",
            "value": "33"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "36"
          }
        ]
      }
    },
    {
      "slug": "subo",
      "name": "速播资源",
      "shortName": "速播",
      "api": "https://subocaiji.com/api.php/provide/vod/",
      "site": "https://subocaiji.com/",
      "priority": 27,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "纪录片",
            "value": "5"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "爱情片",
            "value": "7"
          },
          {
            "title": "科幻片",
            "value": "8"
          },
          {
            "title": "战争片",
            "value": "9"
          },
          {
            "title": "剧情片",
            "value": "10"
          },
          {
            "title": "恐怖片",
            "value": "11"
          },
          {
            "title": "喜剧片",
            "value": "12"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "大陆剧",
            "value": "14"
          },
          {
            "title": "台湾剧",
            "value": "15"
          },
          {
            "title": "韩剧",
            "value": "16"
          },
          {
            "title": "美剧",
            "value": "17"
          },
          {
            "title": "港澳剧",
            "value": "18"
          },
          {
            "title": "日剧",
            "value": "20"
          },
          {
            "title": "泰剧",
            "value": "21"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "4"
          },
          {
            "title": "大陆综艺",
            "value": "33"
          },
          {
            "title": "日韩综艺",
            "value": "34"
          },
          {
            "title": "港台综艺",
            "value": "35"
          },
          {
            "title": "欧美综艺",
            "value": "36"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "3"
          },
          {
            "title": "动漫电影",
            "value": "13"
          },
          {
            "title": "中国动漫",
            "value": "24"
          },
          {
            "title": "日本动漫",
            "value": "25"
          },
          {
            "title": "欧美动漫",
            "value": "26"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "27"
          },
          {
            "title": "古装仙侠",
            "value": "37"
          },
          {
            "title": "现代都市",
            "value": "38"
          },
          {
            "title": "穿越年代",
            "value": "39"
          },
          {
            "title": "言情总裁",
            "value": "40"
          },
          {
            "title": "重生民国",
            "value": "41"
          },
          {
            "title": "反转爽剧",
            "value": "42"
          },
          {
            "title": "脑洞悬疑",
            "value": "43"
          },
          {
            "title": "擦边短剧",
            "value": "44"
          },
          {
            "title": "AI漫剧",
            "value": "45"
          }
        ]
      }
    },
    {
      "slug": "jinying",
      "name": "金鹰资源",
      "shortName": "金鹰",
      "api": "https://jyzyapi.com/api.php/provide/vod/",
      "site": "https://jyzyapi.com/",
      "priority": 28,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "2"
          },
          {
            "title": "动作片",
            "value": "9"
          },
          {
            "title": "爱情片",
            "value": "10"
          },
          {
            "title": "喜剧片",
            "value": "11"
          },
          {
            "title": "科幻片",
            "value": "12"
          },
          {
            "title": "恐怖片",
            "value": "13"
          },
          {
            "title": "剧情片",
            "value": "14"
          },
          {
            "title": "战争片",
            "value": "15"
          },
          {
            "title": "记录片",
            "value": "16"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "1"
          },
          {
            "title": "欧美剧",
            "value": "3"
          },
          {
            "title": "香港剧",
            "value": "4"
          },
          {
            "title": "韩剧",
            "value": "5"
          },
          {
            "title": "日剧",
            "value": "6"
          },
          {
            "title": "马泰剧",
            "value": "7"
          },
          {
            "title": "内地剧",
            "value": "20"
          },
          {
            "title": "台湾剧",
            "value": "28"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "27"
          },
          {
            "title": "大陆综艺",
            "value": "36"
          },
          {
            "title": "日韩综艺",
            "value": "37"
          },
          {
            "title": "港台综艺",
            "value": "38"
          },
          {
            "title": "欧美综艺",
            "value": "39"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "17"
          },
          {
            "title": "动画片",
            "value": "23"
          },
          {
            "title": "中国动漫",
            "value": "24"
          },
          {
            "title": "日本动漫",
            "value": "25"
          },
          {
            "title": "欧美动漫",
            "value": "26"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "30"
          },
          {
            "title": "古装仙侠",
            "value": "40"
          },
          {
            "title": "现代都市",
            "value": "41"
          },
          {
            "title": "穿越年代",
            "value": "42"
          },
          {
            "title": "言情总裁",
            "value": "43"
          },
          {
            "title": "重生民国",
            "value": "44"
          },
          {
            "title": "反转爽剧",
            "value": "45"
          },
          {
            "title": "脑洞悬疑",
            "value": "46"
          },
          {
            "title": "擦边短剧",
            "value": "47"
          },
          {
            "title": "AI漫剧",
            "value": "48"
          }
        ]
      }
    },
    {
      "slug": "diyi",
      "name": "第一资源",
      "shortName": "第一",
      "api": "https://caiji.diyizy.net/api.php/provide/vod/",
      "site": "https://caiji.diyizy.net/",
      "priority": 29,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "日本剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "18"
          },
          {
            "title": "泰国剧",
            "value": "19"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "54"
          }
        ]
      }
    },
    {
      "slug": "changzhang",
      "name": "厂长资源",
      "shortName": "厂长",
      "api": "https://api.changzhang.tv/api.php/provide/vod/from/changzhangm3u8/",
      "site": "https://api.changzhang.tv/",
      "priority": 30,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "电影片",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "101"
          },
          {
            "title": "喜剧片",
            "value": "102"
          },
          {
            "title": "科幻片",
            "value": "103"
          },
          {
            "title": "恐怖片",
            "value": "104"
          },
          {
            "title": "爱情片",
            "value": "105"
          },
          {
            "title": "剧情片",
            "value": "106"
          },
          {
            "title": "战争片",
            "value": "107"
          },
          {
            "title": "纪录片",
            "value": "6"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "201"
          },
          {
            "title": "欧美剧",
            "value": "202"
          },
          {
            "title": "香港剧",
            "value": "203"
          },
          {
            "title": "韩国剧",
            "value": "204"
          },
          {
            "title": "台湾剧",
            "value": "205"
          },
          {
            "title": "日本剧",
            "value": "206"
          },
          {
            "title": "海外剧",
            "value": "207"
          },
          {
            "title": "泰国剧",
            "value": "208"
          }
        ],
        "variety": [
          {
            "title": "综艺片",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "301"
          },
          {
            "title": "港台综艺",
            "value": "302"
          },
          {
            "title": "日韩综艺",
            "value": "303"
          },
          {
            "title": "欧美综艺",
            "value": "304"
          }
        ],
        "anime": [
          {
            "title": "动画片",
            "value": "108"
          },
          {
            "title": "动漫片",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "401"
          },
          {
            "title": "日韩动漫",
            "value": "402"
          },
          {
            "title": "欧美动漫",
            "value": "403"
          },
          {
            "title": "港台动漫",
            "value": "404"
          },
          {
            "title": "海外动漫",
            "value": "405"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "5"
          },
          {
            "title": "都市脑洞",
            "value": "501"
          },
          {
            "title": "古装仙侠",
            "value": "502"
          },
          {
            "title": "反转爽文",
            "value": "503"
          },
          {
            "title": "重生民国",
            "value": "504"
          },
          {
            "title": "穿越年代",
            "value": "505"
          },
          {
            "title": "现代言情",
            "value": "506"
          },
          {
            "title": "闪婚离婚",
            "value": "507"
          },
          {
            "title": "女恋总裁",
            "value": "508"
          }
        ]
      }
    },
    {
      "slug": "xingye",
      "name": "星夜资源",
      "shortName": "星夜",
      "api": "https://xyezy.com/api.php/provide/vod/",
      "site": "https://xyezy.com/",
      "priority": 31,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          }
        ],
        "tv": [
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "海外剧",
            "value": "23"
          },
          {
            "title": "泰国剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "港台综艺",
            "value": "26"
          },
          {
            "title": "日韩综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫激情",
            "value": "43"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "36"
          }
        ]
      }
    },
    {
      "slug": "fanqie",
      "name": "番茄资源",
      "shortName": "番茄",
      "api": "https://fqzy.me/api.php/provide/vod/",
      "site": "https://fqzy.me/",
      "priority": 32,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          }
        ],
        "tv": [
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "海外剧",
            "value": "23"
          },
          {
            "title": "泰国剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "港台综艺",
            "value": "26"
          },
          {
            "title": "日韩综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫精选",
            "value": "22"
          },
          {
            "title": "动漫精选",
            "value": "23"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "36"
          }
        ]
      }
    },
    {
      "slug": "dadi",
      "name": "大地资源",
      "shortName": "大地",
      "api": "https://dadiapi.com/api.php/provide/vod/",
      "site": "https://dadiapi.com/",
      "priority": 33,
      "tier": "B",
      "categories": {
        "movie": [
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          }
        ],
        "tv": [
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "韩国剧",
            "value": "15"
          },
          {
            "title": "欧美剧",
            "value": "16"
          },
          {
            "title": "台湾剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "海外剧",
            "value": "23"
          },
          {
            "title": "泰国剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "港台综艺",
            "value": "26"
          },
          {
            "title": "日韩综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫精品",
            "value": "20"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "36"
          }
        ]
      }
    },
    {
      "slug": "baidu",
      "name": "百度资源",
      "shortName": "百度",
      "api": "https://api.apibdzy.com/api.php/provide/vod/",
      "site": "https://api.apibdzy.com/",
      "priority": 34,
      "tier": "C",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          },
          {
            "title": "4K电影",
            "value": "62"
          },
          {
            "title": "邵氏电影",
            "value": "70"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "台湾剧",
            "value": "18"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画电影",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          },
          {
            "title": "有声动漫",
            "value": "63"
          }
        ],
        "short": [
          {
            "title": "ai短剧",
            "value": "54"
          }
        ]
      }
    },
    {
      "slug": "yaya",
      "name": "丫丫资源",
      "shortName": "丫丫",
      "api": "https://cj.yayazy.net/api.php/provide/vod/",
      "site": "https://cj.yayazy.net/",
      "priority": 35,
      "tier": "C",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "喜剧片",
            "value": "7"
          },
          {
            "title": "爱情片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "纪录片",
            "value": "20"
          },
          {
            "title": "4K电影",
            "value": "62"
          },
          {
            "title": "邵氏电影",
            "value": "70"
          },
          {
            "title": "Netflix电影",
            "value": "71"
          }
        ],
        "tv": [
          {
            "title": "电视剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "欧美剧",
            "value": "14"
          },
          {
            "title": "海外剧",
            "value": "23"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "国产动漫",
            "value": "29"
          },
          {
            "title": "日韩动漫",
            "value": "30"
          },
          {
            "title": "欧美动漫",
            "value": "31"
          },
          {
            "title": "动画片",
            "value": "39"
          },
          {
            "title": "港台动漫",
            "value": "44"
          },
          {
            "title": "海外动漫",
            "value": "45"
          },
          {
            "title": "有声动漫",
            "value": "63"
          }
        ],
        "short": [
          {
            "title": "爽文短剧",
            "value": "54"
          },
          {
            "title": "擦边短剧",
            "value": "73"
          }
        ]
      }
    },
    {
      "slug": "zy1080",
      "name": "1080资源库",
      "shortName": "1080",
      "api": "https://api.1080zyku.com/inc/apijson.php",
      "site": "https://api.1080zyku.com/",
      "priority": 36,
      "tier": "C",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "5"
          },
          {
            "title": "喜剧片",
            "value": "6"
          },
          {
            "title": "爱情片",
            "value": "7"
          },
          {
            "title": "科幻片",
            "value": "8"
          },
          {
            "title": "恐怖片",
            "value": "9"
          },
          {
            "title": "剧情片",
            "value": "10"
          },
          {
            "title": "战争片",
            "value": "11"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "12"
          },
          {
            "title": "台湾剧",
            "value": "13"
          },
          {
            "title": "韩国剧",
            "value": "14"
          },
          {
            "title": "欧美剧",
            "value": "15"
          },
          {
            "title": "香港剧",
            "value": "16"
          },
          {
            "title": "泰国剧",
            "value": "17"
          },
          {
            "title": "日本剧",
            "value": "18"
          },
          {
            "title": "海外剧",
            "value": "54"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "62"
          },
          {
            "title": "港台综艺",
            "value": "63"
          },
          {
            "title": "日韩综艺",
            "value": "64"
          },
          {
            "title": "欧美综艺",
            "value": "65"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动画片",
            "value": "41"
          },
          {
            "title": "国产动漫",
            "value": "66"
          },
          {
            "title": "日韩动漫",
            "value": "67"
          },
          {
            "title": "欧美动漫",
            "value": "68"
          },
          {
            "title": "港台动漫",
            "value": "69"
          },
          {
            "title": "海外动漫",
            "value": "70"
          }
        ],
        "short": [
          {
            "title": "短剧大全",
            "value": "83"
          }
        ]
      }
    },
    {
      "slug": "piaoling",
      "name": "飘零资源",
      "shortName": "飘零",
      "api": "https://p2100.net/api.php/provide/vod/",
      "site": "https://p2100.net/",
      "priority": 37,
      "tier": "C",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "动作片",
            "value": "5"
          },
          {
            "title": "喜剧片",
            "value": "6"
          },
          {
            "title": "爱情片",
            "value": "7"
          },
          {
            "title": "科幻片",
            "value": "8"
          },
          {
            "title": "恐怖片",
            "value": "9"
          },
          {
            "title": "剧情片",
            "value": "10"
          },
          {
            "title": "战争片",
            "value": "11"
          },
          {
            "title": "纪录片",
            "value": "21"
          },
          {
            "title": "邵氏大片",
            "value": "22"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "12"
          },
          {
            "title": "香港剧",
            "value": "13"
          },
          {
            "title": "台湾剧",
            "value": "14"
          },
          {
            "title": "日本剧",
            "value": "15"
          },
          {
            "title": "韩国剧",
            "value": "16"
          },
          {
            "title": "欧美剧",
            "value": "17"
          },
          {
            "title": "海外剧",
            "value": "18"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "3"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动漫电影",
            "value": "28"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "19"
          }
        ]
      }
    },
    {
      "slug": "maotai",
      "name": "茅台资源",
      "shortName": "茅台",
      "api": "https://caiji.maotaizy.cc/api.php/provide/vod/",
      "site": "https://caiji.maotaizy.cc/",
      "priority": 38,
      "tier": "C",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "纪录片",
            "value": "5"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "爱情片",
            "value": "7"
          },
          {
            "title": "喜剧片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "惊悚片",
            "value": "50"
          },
          {
            "title": "电影资讯",
            "value": "51"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "欧美剧",
            "value": "15"
          },
          {
            "title": "韩剧",
            "value": "16"
          },
          {
            "title": "泰国剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "台湾剧",
            "value": "23"
          },
          {
            "title": "海外剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "综艺片",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          },
          {
            "title": "演唱会",
            "value": "29"
          },
          {
            "title": "记录片",
            "value": "57"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动漫电影",
            "value": "20"
          },
          {
            "title": "国产动漫",
            "value": "30"
          },
          {
            "title": "日本动漫",
            "value": "31"
          },
          {
            "title": "欧美动漫",
            "value": "32"
          },
          {
            "title": "海外动漫",
            "value": "33"
          },
          {
            "title": "AI动漫",
            "value": "56"
          }
        ],
        "short": [
          {
            "title": "短剧大全",
            "value": "37"
          },
          {
            "title": "重生民国",
            "value": "43"
          },
          {
            "title": "穿越现代",
            "value": "44"
          },
          {
            "title": "反转爽剧",
            "value": "45"
          },
          {
            "title": "言情总裁",
            "value": "46"
          },
          {
            "title": "现代都市",
            "value": "47"
          },
          {
            "title": "古装仙侠",
            "value": "48"
          },
          {
            "title": "悬疑烧脑",
            "value": "49"
          },
          {
            "title": "AI短剧",
            "value": "54"
          },
          {
            "title": "擦边短剧",
            "value": "55"
          }
        ]
      }
    },
    {
      "slug": "douban",
      "name": "豆瓣资源",
      "shortName": "豆瓣",
      "api": "https://dbzy.tv/api.php/provide/vod/",
      "site": "https://dbzy.tv/",
      "priority": 39,
      "tier": "D",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "1"
          },
          {
            "title": "纪录片",
            "value": "5"
          },
          {
            "title": "动作片",
            "value": "6"
          },
          {
            "title": "爱情片",
            "value": "7"
          },
          {
            "title": "喜剧片",
            "value": "8"
          },
          {
            "title": "科幻片",
            "value": "9"
          },
          {
            "title": "恐怖片",
            "value": "10"
          },
          {
            "title": "剧情片",
            "value": "11"
          },
          {
            "title": "战争片",
            "value": "12"
          },
          {
            "title": "惊悚片",
            "value": "50"
          },
          {
            "title": "电影资讯",
            "value": "51"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "2"
          },
          {
            "title": "国产剧",
            "value": "13"
          },
          {
            "title": "香港剧",
            "value": "14"
          },
          {
            "title": "欧美剧",
            "value": "15"
          },
          {
            "title": "韩剧",
            "value": "16"
          },
          {
            "title": "泰国剧",
            "value": "21"
          },
          {
            "title": "日本剧",
            "value": "22"
          },
          {
            "title": "台湾剧",
            "value": "23"
          },
          {
            "title": "海外剧",
            "value": "24"
          }
        ],
        "variety": [
          {
            "title": "综艺片",
            "value": "3"
          },
          {
            "title": "大陆综艺",
            "value": "25"
          },
          {
            "title": "日韩综艺",
            "value": "26"
          },
          {
            "title": "港台综艺",
            "value": "27"
          },
          {
            "title": "欧美综艺",
            "value": "28"
          },
          {
            "title": "演唱会",
            "value": "29"
          },
          {
            "title": "记录片",
            "value": "56"
          }
        ],
        "anime": [
          {
            "title": "动漫",
            "value": "4"
          },
          {
            "title": "动漫电影",
            "value": "20"
          },
          {
            "title": "国产动漫",
            "value": "30"
          },
          {
            "title": "日本动漫",
            "value": "31"
          },
          {
            "title": "欧美动漫",
            "value": "32"
          },
          {
            "title": "海外动漫",
            "value": "33"
          },
          {
            "title": "AI动漫",
            "value": "55"
          }
        ],
        "short": [
          {
            "title": "短剧大全",
            "value": "37"
          },
          {
            "title": "重生民国",
            "value": "43"
          },
          {
            "title": "穿越现代",
            "value": "44"
          },
          {
            "title": "反转爽剧",
            "value": "45"
          },
          {
            "title": "言情总裁",
            "value": "46"
          },
          {
            "title": "现代都市",
            "value": "47"
          },
          {
            "title": "古装仙侠",
            "value": "48"
          },
          {
            "title": "悬疑烧脑",
            "value": "49"
          },
          {
            "title": "AI短剧",
            "value": "53"
          },
          {
            "title": "擦边短剧",
            "value": "54"
          }
        ]
      }
    },
    {
      "slug": "iqiyi",
      "name": "爱奇艺资源",
      "shortName": "爱奇艺",
      "api": "http://iqiyizyapi.com/api.php/provide/vod/",
      "site": "http://iqiyizyapi.com/",
      "priority": 40,
      "tier": "D",
      "categories": {
        "movie": [
          {
            "title": "电影",
            "value": "7"
          },
          {
            "title": "动作片",
            "value": "10"
          },
          {
            "title": "喜剧片",
            "value": "11"
          },
          {
            "title": "爱情片",
            "value": "12"
          },
          {
            "title": "科幻片",
            "value": "13"
          },
          {
            "title": "恐怖片",
            "value": "14"
          },
          {
            "title": "剧情片",
            "value": "15"
          },
          {
            "title": "战争片",
            "value": "16"
          },
          {
            "title": "惊悚片",
            "value": "17"
          },
          {
            "title": "家庭片",
            "value": "18"
          },
          {
            "title": "古装片",
            "value": "19"
          },
          {
            "title": "历史片",
            "value": "20"
          },
          {
            "title": "悬疑片",
            "value": "21"
          },
          {
            "title": "犯罪片",
            "value": "22"
          },
          {
            "title": "灾难片",
            "value": "23"
          },
          {
            "title": "记录片",
            "value": "24"
          },
          {
            "title": "短片",
            "value": "25"
          }
        ],
        "tv": [
          {
            "title": "连续剧",
            "value": "8"
          },
          {
            "title": "国产剧",
            "value": "26"
          },
          {
            "title": "香港剧",
            "value": "27"
          },
          {
            "title": "韩国剧",
            "value": "28"
          },
          {
            "title": "欧美剧",
            "value": "29"
          },
          {
            "title": "台湾剧",
            "value": "30"
          },
          {
            "title": "日本剧",
            "value": "31"
          },
          {
            "title": "海外剧",
            "value": "32"
          },
          {
            "title": "泰国剧",
            "value": "33"
          }
        ],
        "variety": [
          {
            "title": "综艺",
            "value": "9"
          },
          {
            "title": "大陆综艺",
            "value": "34"
          },
          {
            "title": "港台综艺",
            "value": "35"
          },
          {
            "title": "日韩综艺",
            "value": "36"
          },
          {
            "title": "欧美综艺",
            "value": "37"
          }
        ],
        "anime": [
          {
            "title": "国产动漫",
            "value": "1"
          },
          {
            "title": "日韩动漫",
            "value": "2"
          },
          {
            "title": "欧美动漫",
            "value": "3"
          },
          {
            "title": "港台动漫",
            "value": "4"
          },
          {
            "title": "动漫电影",
            "value": "5"
          },
          {
            "title": "动漫",
            "value": "40"
          }
        ],
        "short": [
          {
            "title": "短剧",
            "value": "38"
          }
        ]
      }
    }
  ]
};
var CINEVERSE_SOURCES = CINEVERSE_CONFIG.sources;
var CV_MATCH_CACHE = {};
var CV_MATCH_CACHE_TTL = 180000;

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
  return lineEdition || cvEdition(item);
}
function cvShowEditionLabels(matches) {
  var editions = {};
  var explicit = false;
  matches.forEach(function (match) {
    var edition = cvEdition(match.item);
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
  var wanted = cvBaseTitle(keyword);
  var title = cvBaseTitle(item.vod_name);
  if (!wanted || !title || (title !== wanted && title.indexOf(wanted) !== 0 && wanted.indexOf(title) !== 0)) return false;
  var type = cvText(params && (params.type || params.mediaType)).toLowerCase();
  if ((type === "tv" || type === "movie") && cvMediaType(item) !== type) return false;
  return true;
}
async function cvFindMatches(keyword, params) {
  var cacheKey = [
    cvBaseTitle(keyword),
    cvText(params && (params.year || params.releaseYear || params.releaseDate)).match(/(?:19|20)\d{2}/) || "",
    Math.floor(Number(params && (params.season || params.seasonNumber))) || cvSeasonNumber(keyword) || 0,
    cvText(params && (params.type || params.mediaType)).toLowerCase()
  ].join("|");
  var cached = CV_MATCH_CACHE[cacheKey];
  if (cached && Date.now() - cached.time < CV_MATCH_CACHE_TTL) return cached.rows.slice();
  var responses = await cvBatches(CINEVERSE_SOURCES, function (source) {
    return cvSafeGet(source, { ac: "detail", wd: keyword }).then(function (payload) {
      return { source: source, list: payload.list || [] };
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
  var exact = [];
  if (!requestedYear && !requestedSeason) {
    exact = pool.filter(function (row) { return cvBaseTitle(row.item.vod_name) === wanted; });
    if (exact.length) {
      pool = exact;
    } else {
      var years = pool.map(function (row) { return Number(row.item.vod_year); }).filter(function (year) { return isFinite(year) && year >= 1900 && year <= 2100; });
      if (years.length) {
        var earliestYear = Math.min.apply(Math, years);
        pool = pool.filter(function (row) { return Number(row.item.vod_year) === earliestYear; });
      } else {
        var shortest = Math.min.apply(Math, pool.map(function (row) { return cvNormalize(row.item.vod_name).length; }));
        pool = pool.filter(function (row) { return cvNormalize(row.item.vod_name).length === shortest; });
      }
    }
  }
  exact = pool.filter(function (row) { return cvBaseTitle(row.item.vod_name) === wanted; });
  if (exact.length) pool = exact;
  if (!exact.length && pool.length) {
    var titleStats = {};
    pool.forEach(function (row) {
      var key = cvBaseTitle(row.item.vod_name);
      if (!titleStats[key]) titleStats[key] = { key: key, length: key.length, count: 0 };
      titleStats[key].count += 1;
    });
    var canonical = Object.keys(titleStats).map(function (key) { return titleStats[key]; }).sort(function (a, b) {
      if (a.length !== b.length) return a.length - b.length;
      return b.count - a.count;
    })[0];
    if (canonical) pool = pool.filter(function (row) { return cvBaseTitle(row.item.vod_name) === canonical.key; });
  }

  pool.sort(function (a, b) {
    var aExact = cvBaseTitle(a.item.vod_name) === wanted ? 0 : 1;
    var bExact = cvBaseTitle(b.item.vod_name) === wanted ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return cvNormalize(a.item.vod_name).length - cvNormalize(b.item.vod_name).length;
  });
  var picked = {};
  var result = pool.filter(function (row) {
    var editionKey = cvEdition(row.item) || "default";
    var key = row.source.slug + "|" + editionKey;
    if (picked[key]) return false;
    picked[key] = true;
    return true;
  });
  if (Object.keys(CV_MATCH_CACHE).length >= 50) CV_MATCH_CACHE = {};
  CV_MATCH_CACHE[cacheKey] = { time: Date.now(), rows: result.slice() };
  return result;
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
      if (number > 0) hasNumberedTitles = true;
      if (number === episode) return [lines[lineIndex]];
    }
    return hasNumberedTitles ? [] : (lines[episode - 1] ? [lines[episode - 1]] : []);
  }
  if (episodeName) return [];
  return lines[0] ? [lines[0]] : [];
}
function cvPickLine(lines, params, mediaType) {
  var picked = cvPickLines(lines, params, mediaType || "tv");
  return picked.length ? picked[0] : null;
}
function cvEpisodeNumber(value) {
  var title = cvStrip(value);
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
    matches = await cvFindMatches(keyword, params);
    if (matches.length) break;
  }
  if (!matches.length) return [];
  var seen = {};
  var choices = [];
  var showEditions = cvShowEditionLabels(matches);
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
    var edition = choice.edition;
    resources.push({ name: match.source.name + variant + (showEditions && edition ? " · " + edition : "") + " · " + line.title,
      description: "来源：" + match.source.name + (variant ? "\n匹配：" + matchedTitle : "") + (showEditions && edition ? "\n版本：" + edition : ""),
      url: line.url, playerType: "app" });
  });
  return resources;
}

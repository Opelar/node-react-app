const charset = require('superagent-charset');
const request = charset(require('superagent'));
const cheerio = require('cheerio');
const MovieUrl = require('../../app/models/movieUrl');
const Movie = require('../../app/models/movie');

const BASE_URL = 'https://www.dytt8.net/';

const mapKeysString = {
  translate_name: '译　　名',
  movie_title: '片　　名',
  years: '年　　代',
  region: '产　　地',
  category: '类　　别',
  language: '语　　言',
  fansub: '字　　幕',
  release_date: '上映日期',
  imdb: 'IMDb评',
  douban: '豆瓣评分',
  file_format: '文件格式',
  video_size: '视频尺寸',
  file_size: '文件大小',
  film_length: '片　　长',
  director: '导　　演',
  writer: '编　　剧',
  actors: '主　　演',
  tags: '标　　签',
  introduction: '简　　介',
  award: '获奖情况',
}

module.exports = async function getMovieDetails() {
  try {
    const query = await MovieUrl.find({});
    if (query && query.length > 0) {
      const notUsedList = query.filter(item => !item['is_used']);
      movieInit(notUsedList);
    }
  } catch (error) {
    console.error(error);
  }
};

function movieInit(urlList) {
  if (!urlList || urlList.length === 0) {
    return;
  }

  const urlObj = urlList[0];
  console.log(urlObj);
  request
    .get(BASE_URL + urlObj.url)
    .charset()
    .end((err, res) => {
      if (err) {
        urlList.shift();
        movieInit(urlList);
        console.error(err);
      }
      if (res && res.text) {
        const obj = resolvingResponse(res.text, urlObj.text);
        const movie = new Movie(obj);

        movie.save((err, doc) => {
          urlList.shift();
          movieInit(urlList);

          if (err) {
            return console.error(err);
          }

          MovieUrl.update({ text: urlObj.text }, { is_used: true });
        })
      }
    });
}

function resolvingResponse(text, name) {
  const obj = {};
  const $ = cheerio.load(text, { decodeEntities: false });
  const detailsContainer = $('#Zoom>span>p').html();
  const textList = detailsContainer ? detailsContainer.split('◎') : [];

  const downloadLinks = [];
  $('#Zoom a').each((_, ele) => {
    if ($(ele) && $(ele).attr('href')) {
      if (
        !$(ele).attr('href').includes('http://') &&
        !$(ele).attr('href').includes('https://')
      ) {
        downloadLinks.push($(ele).attr('href'))
      }
    }
  })
  obj.download_link = downloadLinks || [];

  // return transformToObject(textList);
  obj.name = name;
  obj.title = $('.title_all>h1').text();

  const pubDate = $('.co_content8>ul')
    .text()
    .split('\n')
    .find(x => x.includes('发布时间：'));
  obj.pubdate = pubDate ? pubDate.split('发布时间：')[1].trim() : '';

  // cover and screenshot
  const images = textList
    .filter(x => x.includes('<img'))
    .map(y => {
      return cheerio.load(y)('img').attr('src');
    });
  obj.cover = images[0];
  images.shift();
  obj.screenshot = images;

  const array = genData(textList || []);

  Object.keys(mapKeysString).forEach(key => {
    const zkey = mapKeysString[key];
    const current = array.find(item => Object.keys(item)[0] === zkey);
    if (current) {
      obj[key] = Object.values(current)[0];
    }
  })

  return obj;
}

function genData(textList) {
  if (textList.length === 0) {
    return [];
  }
  return textList
    .filter(a => !a.startsWith('<img'))
    .filter(b => !b.startsWith('<font'))
    .filter(c => !c.startsWith('</font>'))
    .filter(d => d.trim())
    .map(e => {
      let key = e.slice(0, 5).trim();
      let val = e.slice(5, e.length).trim();
      if (val) {
        val = val
          .split('<br>')
          .filter(x => x.trim())
          .map(y => y.trim())
          .filter(z => !z.startsWith('<'))
        val = val.length === 1 ? val[0] : val;

        if (typeof val === 'string') {
          if (val.includes('/')) {
            val = val.split('/').map(m => m.trim());
          }
          if (val.includes('|')) {
            val = val.split('|').map(m => m.trim());
          }
        }
      }
      return {
        [key]: val
      };
    })
}

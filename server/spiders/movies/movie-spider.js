const charset = require('superagent-charset');
const request = charset(require('superagent'));
const cheerio = require('cheerio');
const MovieUrl = require('../../app/models/movieUrl');

const BASE_URL = 'https://www.dytt8.net/';


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

// test
const urlObj = {
  "_id": "5d8481a153ef78fe7f2fed27",
  "text": "09最新动作片《热血高校2》DVD中字",
  "url": "/html/gndy/dyzz/20191011/59246.html",
  "__v": 0
}

function movieInit(urlList) {
  // const urlObj = urlList[0];
  request
    .get(BASE_URL + urlObj.url)
    .charset()
    .end((err, res) => {
      if (err) {
        console.error(err);
      }
      if (res && res.text) {
        const obj = resolvingResponse(res.text, urlObj.text);
        // @todo
        // 存库，标记
      }
    });
}

const mapStr = {
  movie_title: '◎片　　名',
  years: '◎年　　代',
  fansub: '◎字　　幕',
  imdb: '◎IMDB评分',
  douban: '◎豆瓣评分',
  file_format: '◎文件格式',
  video_size: '◎视频尺寸',
  file_size: '◎文件大小',
  film_length: '◎片　　长',
}

const mapArr = {
  translate_name: ['◎译　　名', '/'],
  region: ['◎国　　家', '/'],
  category: ['◎类　　别', '/'],
  release_date: ['◎上映日期', '/'],
  category: ['◎类　　别', '/'],
  tags: ['◎标　　签', '|']
}

function resolvingResponse(text, name) {
  const obj = {};
  const $ = cheerio.load(text, { decodeEntities: false });
  const detailsContainer = $('#Zoom>span>p').html();
  const textList = detailsContainer ? detailsContainer.split('<br>') : [];
  // return transformToObject(textList);
  obj.name = name;
  obj.title = $('.title_all>h1').text();

  const pubDate = $('.co_content8>ul')
    .text()
    .split('\n')
    .find(x => x.includes('发布时间：'));
  obj.pubdate = pubDate ? pubDate.split('发布时间：')[1].trim() : '';

  const images = textList
    .filter(x => x.includes('<img'))
    .map(y => {
      return cheerio.load(y)('img').attr('src');
    });
  obj.cover = images[0];
  images.shift();
  obj.screenshot = images;

  const array = textList
    .filter(a => !a.startsWith('<img'))
    .filter(b => !b.startsWith('<font'))
    .filter(c => !c.startsWith('</font>'))
    .filter(d => d.trim());

  for (let i = 0; i < array.length; i++) {
    const current = array[i];

    Object.keys(mapStr).forEach(key => {
      if (current.includes(mapStr[key])) {
        obj[key] = current.split(mapStr[key])[1].trim();
      }
    })

    Object.keys(mapArr).forEach(key => {
      if (current.includes(mapArr[key][0])) {
        obj[key] = current
          .split(mapArr[key][0])[1]
          .split(mapArr[key][1])
          .map(x => x.trim())
      }
    })

    // @todo
  }

  console.log(obj);
}

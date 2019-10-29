const charset = require('superagent-charset');
const request = charset(require('superagent'));
const cheerio = require('cheerio');
const MovieUrl = require('../../app/models/movieUrl');

// const base = 'https://www.dytt8.net/';
const basePageUrl = 'https://www.dytt8.net/html/gndy/dyzz/';
const indexUrl = 'https://www.dytt8.net/html/gndy/dyzz/index.html';

module.exports = function movieUrlInit() {
  request
    .get(indexUrl)
    .charset()
    .end((err, res) => {
      if (err) return console.error(err);
      const pagesStack = generatePagesStack(res.text);
      getAllMovieDetailURL(pagesStack, [], (err, arr) => {
        if (err) {
          return console.error(err);
        }

        arr.forEach(item => {
          const movieUrl = new MovieUrl(item);
          // console.log(movieUrl);
          movieUrl.save((err, doc) => {
            if (err) {
              console.error(err);
            }
          })
        });
      });
    });
}

function generatePagesStack(html) {
  const pagesStack = [];
  const $ = cheerio.load(html);
  const $options = $('[name="sldd"] > option');
  if ($options) {
    $options.each((idx, ele) => {
      if ($(ele)) {
        pagesStack.push({
          page: $(ele).text(),
          pageUrl: $(ele).attr('value')
        });
      }
    });
  }
  return pagesStack.length === 0
    ? pagesStack
    : pagesStack.map(item => {
      item.pageUrl = `${basePageUrl}${item.pageUrl}`;
      return item;
    });
}

// 获取所有的分页下对应电影详情URL
function getAllMovieDetailURL(pagesStack, allDetailUrls, callback) {
  // test
  // if (allDetailUrls.length > 10) {
  //   return callback(null, allDetailUrls);
  // }
  if (pagesStack.length === 0) {
    return callback(null, allDetailUrls);
  }
  if (!pagesStack[0].pageUrl) {
    pagesStack.shift();
    return getAllMovieDetailURL(pagesStack, allDetailUrls, callback);
  }
  console.log(`开始爬取第  [ ${pagesStack[0].page} ] 页详情URL================`)
  request
    .get(pagesStack[0].pageUrl)
    .charset()
    .end((err, res) => {
      if (err) {
        console.log('爬取失败err', pagesStack[0].pageUrl);
        pagesStack.shift();
        return getAllMovieDetailURL(pagesStack, allDetailUrls, callback);
      }
      if (res && res.text) {
        const detailUrls = generateDetailUrlStack(res.text);
        // console.log('DETAILS_URLS', detailUrls);
        console.log(`成功爬取: 第  [ ${pagesStack[0].page} ] 页`);
        console.log('');
        allDetailUrls = [...allDetailUrls, ...detailUrls];
        pagesStack.shift();
        return getAllMovieDetailURL(pagesStack, allDetailUrls, callback);
      }
    })
}

function generateDetailUrlStack(html) {
  const detailUrls = [];
  const $ = cheerio.load(html);
  const $list = $('a.ulink');
  if ($list) {
    $list.each((_, ele) => {
      const text = $(ele).text();
      const url = $(ele).attr('href');
      detailUrls.push({ text, url });
    })
  }
  return detailUrls;
}

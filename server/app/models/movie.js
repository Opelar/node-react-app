const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: { type: String, unique: true, trim: true }, // name
  title: { type: String, trim: true }, // title
  pubdate: {}, // 发布时间

  cover: {}, // 封面
  screenshot: {}, // 截图

  translate_name: {}, // 译名
  movie_title: {}, // 片名
  years: {}, // 年代

  imdb: {}, // imdb
  douban: {}, // 豆瓣

  fansub: {}, //字幕
  file_format: {}, // ◎文件格式
  video_size: {}, // ◎视频尺寸
  file_size: {}, // ◎文件大小
  film_length: {}, // ◎片　长

  category: {}, // 类别
  release_date: {}, //上映时间
  region: {}, // 产地
  language: {}, // 语言
  tags: {}, // 标签

  director: {}, // 导演
  writer: {}, // 编剧
  actors: {}, // 演员

  introduction: {}, // 简介
  award: {}, // 获奖情况

  download_link: {}, // 下载链接
});

// Export model.
module.exports = mongoose.model('Movie', MovieSchema);

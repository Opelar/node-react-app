const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: { type: String, unique: true, trim: true }, // name
  title: { type: String, trim: true }, // title
  pubdate: { type: String, }, // 发布时间

  cover: { type: String, trim: true }, // 封面
  screenshot: { type: Array }, // 截图

  translate_name: { type: String, trim: true }, // 译名
  movie_title: { type: String, trim: true }, // 片名
  years: { type: String }, // 年代

  imdb: { type: String }, // imdb
  douban: { type: String }, // 豆瓣

  fansub: { type: String }, //字幕
  file_format: { type: String }, // ◎文件格式
  video_size: { type: String }, // ◎视频尺寸
  file_size: { type: String }, // ◎文件大小
  film_length: { type: String }, // ◎片　长

  category: { type: Array }, // 类别
  release_date: { type: Array }, //上映时间
  region: { type: Array }, // 产地
  language: { type: Array }, // 语言
  tags: { type: Array }, // 标签

  director: { type: Array }, // 导演
  writer: { type: Array }, // 编剧
  actors: { type: Array }, // 演员

  introduction: { type: String, trim: true }, // 简介
  award: { type: Array }, // 获奖情况

  download_link: { type: Array }, // 下载链接
});

// Export model.
module.exports = mongoose.model('Movie', MovieSchema);

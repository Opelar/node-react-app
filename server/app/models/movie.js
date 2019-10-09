const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  pubdate: { type: Date, required: true }, // 发布时间
  cover: { type: String, required: true, trim: true }, // 封面
  translate_name: { type: String, trim: true }, // 译名
  movie_title: { type: String, trim: true }, // 片名
  years: { type: String }, // 年代
  category: { type: Array }, // 类别
  region: { type: Array }, // 产地
  imdb: {
    grade: { type: Number },
    from_users: { type: Number },
  },
  douban: {
    grade: { type: Number },
    from_users: { type: Number },
  },
  film_length: { type: String },
  director: { type: Array }, // 导演
  writer: { type: Array }, // 编剧
  actors: { type: Array }, // 演员
  introduction: { type: String, trim: true }, // 简介
  download_link: { type: Array } // 下载链接
});

// Export model.
module.exports = mongoose.model('Movie', MovieSchema);

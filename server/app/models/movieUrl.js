const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieUrlSchema = new Schema({
  text: { type: String, require: true },
  url: { type: String, required: true },
  is_used: { type: Boolean }
});

// Export model.
module.exports = mongoose.model('MovieUrl', MovieUrlSchema);

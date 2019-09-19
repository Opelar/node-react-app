const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  title: { type: String, required: true },
  name: { type: Schema.ObjectId, required: true }
});

// Export model.
module.exports = mongoose.model('Test', TestSchema);

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],  // for your search/tagging feature
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);

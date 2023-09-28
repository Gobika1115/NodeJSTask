const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
});

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;

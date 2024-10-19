const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  lyrics: String,
  theme: String,
  youtubeLink: String,
});

const songlistSchema = new mongoose.Schema({
  title: String,
  description: String,
  songs: [songSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  public: { type: Boolean, default: false },
});

module.exports = mongoose.model('Songlist', songlistSchema);

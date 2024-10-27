import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  songId: String,
  title: String,
  artist: String,
  album: String,
  album_img: String,
  lyrics: String,
  like: Number,
});

export const Song = mongoose.model('Song', songSchema);

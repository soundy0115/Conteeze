import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  songId: string;
  title: string;
  artist: string;
  album: string;
  album_img: string;
  lyrics: string;
  like: number;
}

const songSchema: Schema = new Schema({
  songId: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  album_img: { type: String, required: true },
  lyrics: { type: String, required: true },
  like: { type: Number, default: 0 },
});

export default mongoose.model<ISong>('Song', songSchema);

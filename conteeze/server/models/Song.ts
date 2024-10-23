import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ISong extends Document {
  songId: string;
  title: string;
  artist: string;
  album: string;
  lyrics: string;
  like: number;
}

const SongSchema: Schema = new Schema({
  songId: { type: String, default: uuidv4, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  lyrics: { type: String, required: true },
  like: { type: Number, default: 0 }
});

export default mongoose.model<ISong>('Song', SongSchema);

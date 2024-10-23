import mongoose, { Schema, Document } from 'mongoose';
import { ISong } from './Song';

export interface ISongList extends Document {
  title: string;
  date: Date;
  songs: ISong[];
  comment: string;
  url: string;
}

const SongListSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  comment: { type: String },
  url: { type: String }
});

export default mongoose.model<ISongList>('SongList', SongListSchema);

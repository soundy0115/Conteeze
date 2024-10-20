import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // uuidv4 임포트

// 유저 인터페이스 정의
export interface IUser extends Document {
  userId: string;
  password: string;
}

// 유저 스키마 정의
const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true, default: uuidv4 }, // default 추가
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);

import { Schema, model, Document } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  mail: string;
  contact: string;
  subject: string;
  gender: string;
  qualificaton: string;
  address: string;
  createdAt?: Date;
}

const TeacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true, trim: true, lowecase:true },
  mail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  contact: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true, lowercase: true },
  qualificaton: { type: String, trim: true },
  address: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<ITeacher>("Teacher", TeacherSchema);

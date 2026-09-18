import { Schema, model, Document } from 'mongoose';

export interface IStudent extends Document {
  first_name: string;
  last_name: string;
  class: string;
  rollno: string;
  dob: string;
  gender: string;
  address: string;
  createdAt?: Date;
}

const StudentSchema = new Schema<IStudent>({
  first_name: { type: String, required: true, trim: true, lowercase: true },
  last_name: { type: String, required: true, trim: true, lowercase: true },
  class: { type: String, required: true, trim: true, lowercase: true },
  rollno: { type: String, required: true, trim: true, lowercase: true },
  dob: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true, lowercase: true },
  address: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<IStudent>('Student', StudentSchema);

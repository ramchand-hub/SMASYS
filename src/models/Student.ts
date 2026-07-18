import { Schema, model, Document } from 'mongoose';

export interface IStudent extends Document {
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  class: string;
  section: string;
  father_name: string;
  mother_name: string;
  father_contact: string;
  father_occupation: string;
  student_phone: string;
  student_mail: string;
  address: string;
  student_type: string;
  createdAt?: Date;
}

const StudentSchema = new Schema<IStudent>({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true, lowercase: true },
  dob: { type: String, required: true, trim: true },
  class: { type: String, required: true, trim: true },
  section: { type: String, required: true, trim: true },
  father_name: { type: String, required: true, trim: true },
  mother_name: { type: String, required: true, trim: true },
  father_contact: { type: String, required: true, trim: true },
  father_occupation: { type: String, required: true, trim: true },
  student_phone: { type: String, required: true, trim: true },
  student_mail: { type: String, required: true, trim: true, lowercase: true },
  address: { type: String, required: true, trim: true },
  student_type: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<IStudent>('Student', StudentSchema);

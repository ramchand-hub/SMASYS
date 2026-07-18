import { Schema, model, Document } from "mongoose";

export interface ITeacher extends Document {
  full_name: string;
  Gender: string;
  DOB: string;
  Marital_status: string;
  Email: string;
  Mobile: string;
  Address: string;
  Joing_date: string;
  Designation: string;
  Department: string;
  Qualificaton: string;
  Experience: string;
  previous_school: string;
  createdAt?: Date;
}

const TeacherSchema = new Schema<ITeacher>({
  full_name: { type: String, required: true, trim: true },
  Gender: { type: String, required: true, trim: true, lowercase: true },
  DOB: { type: String, required: true, trim: true },
  Marital_status: { type: String, required: true, trim: true, lowercase: true },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  Mobile: { type: String, required: true, trim: true },
  Address: { type: String, required: true, trim: true },
  Joing_date: { type: String, required: true, trim: true },
  Designation: { type: String, required: true, trim: true },
  Department: { type: String, required: true, trim: true },
  Qualificaton: { type: String, required: true, trim: true },
  Experience: { type: String, required: true, trim: true },
  previous_school: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<ITeacher>("Teacher", TeacherSchema);

import { Schema, Types, model } from "mongoose";
interface student_attendance {
    student_id: Types.ObjectId;
    status: String;
}

export interface Iattendance extends Document {
    class_id: Types.ObjectId;
    date: String;
    attendance: student_attendance[];
    createdAt?: Date;
    updatedAt?: Date;
}

const student_attendanceSchema = new Schema<student_attendance>({
    student_id: { type: Schema.Types.ObjectId, ref:"Student", required: true },
    status: { type: String, required: true }
})
const attendance_schema = new Schema<Iattendance>({
    class_id: { type: Schema.Types.ObjectId, ref: "class", required: true },
    date: { type: String, required: true },
    attendance: { type: [student_attendanceSchema], required: true }
})
attendance_schema.index(
  { class_id: 1, date:1 },
  { unique: true }
);
export default model<Iattendance>("attendance", attendance_schema);

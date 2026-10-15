
import { Schema, model, Types, Document } from "mongoose";

// Schedule Interface
interface ISchedule {
  time_from: string;
  time_to: string;
  subject: string;
}

// Timetable Interface
export interface ITimetable extends Document {
  class_id: Types.ObjectId;
  day: string;
  schedule: ISchedule[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Schedule Schema
const schedule_schema = new Schema<ISchedule>(
  {
    time_from: {
      type: String,
      required: true,
    },

    time_to: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: true }
);

// Timetable Schema
const TimetableSchema = new Schema<ITimetable>(
  {
    class_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    day: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
    },

    schedule: {
      type: [schedule_schema],
      required: true,
      validate: {
        validator: (value: ISchedule[]) => value.length > 0,
        message: "At least one schedule is required",
      },
    },
  },
  { timestamps: true }
);

// One timetable document per class per day
TimetableSchema.index(
  { class_id: 1, day: 1 },
  { unique: true }
);

export default model<ITimetable>("timetable", TimetableSchema);

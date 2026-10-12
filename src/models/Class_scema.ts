import { Schema, Document, model } from "mongoose";
export interface IClass extends Document {
    class_name: string;
    section: string;
    max_students: number;
    class_teacher: Schema.Types.ObjectId;
}

const class_schema = new Schema<IClass>({
    class_name: { required: true, lowercase: true, type: String },
    section: { required: true, lowercase: true, type: String },
    max_students: { required: true, min: 1, type: Number },
    class_teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
},
    {
        timestamps: true,
    }
)
class_schema.index(
  { class_name: 1, section: 1 },
  { unique: true }
);
export default model<IClass>("class", class_schema)
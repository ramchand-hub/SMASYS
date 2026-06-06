import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  description?: string;
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: [true, 'Role name is required'],
    unique: true,
    trim: true,
    lowercase: true,   
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters'],
  },
}, {
  timestamps: true,          
});

export default model<IRole>('Role', RoleSchema);
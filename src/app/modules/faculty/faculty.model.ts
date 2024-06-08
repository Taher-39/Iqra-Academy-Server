import { Schema, model } from 'mongoose';
import { TFaculty } from './faculty.interface';

const FacultySchema = new Schema<TFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>('Faculty', FacultySchema);

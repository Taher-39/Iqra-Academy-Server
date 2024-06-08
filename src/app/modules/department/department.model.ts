import { Schema, model } from 'mongoose';
import { TDepartment } from './department.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const DepartmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Faculty id is required'],
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
);

DepartmentSchema.pre('save', async function (next) {
  const isDepartmentExits = await Department.findOne({
    name: this.name,
  });
  if (isDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department Already Exits.');
  }
  next();
});

DepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExits = await Department.findOne(query);
  if (!isDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Department Do Not Exits.');
  }
  next();
});

export const Department = model<TDepartment>('Department', DepartmentSchema);

import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IStudent } from './student.interface';

const GetAllStudentInfoIntoDB = async () => {
  const result = await StudentModel.find()
    .populate('semester')
    .populate({
      path: 'department',
      populate: {
        path: 'faculty',
      },
    });
  return result;
};
const GetSingleStudentInfoIntoDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('semester')
    .populate({
      path: 'department',
      populate: {
        path: 'faculty',
      },
    });
  return result;
};

//TODO when id is incorrect show new error
export const deleteStudentService = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const updateStudentService = async (
  id: string,
  payload: Partial<IStudent>,
) => {
  // Destructure the nested fields from the payload
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  // Initialize a new object to hold the modified update data
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  // Check and update the `name` object if it exists
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // Check and update the `guardian` object if it exists
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  // Check and update the `localGuardian` object if it exists
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // Perform the update in the database
  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation on the updated data
    },
  );

  // Return the updated student document
  return result;
};

export const StudentServices = {
  GetAllStudentInfoIntoDB,
  GetSingleStudentInfoIntoDB,
};

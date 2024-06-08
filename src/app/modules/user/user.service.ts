import config from '../../config';
import { SemesterModel as SemesterModel } from '../Semester/semester.model';
import { IStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { generateStudentId } from './user.utils';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
// import mongoose from 'mongoose';

// export const createUserService = async (
//   password: string,
//   payload: IStudent,
// ) => {
//   // create a user object
//   const userData: Partial<TUser> = {};

//   //if password is not given , use deafult password
//   userData.password = password || (config.Default_User_Password as string);

//   //set student role
//   userData.role = 'student';

//   const semester = await SemesterModel.findById(payload.semester);
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     if (!semester) {
//       throw new AppError(
//         httpStatus.NOT_FOUND,
//         'Student semester is null, cannot generate student ID.',
//       );
//     }
//     //set  generated id
//     userData.id = await generateStudentId(semester);

//     // create a user (transaction-1)
//     const newUser = await User.create([userData], { session }); // array

//     //create a student
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id; //reference _id

//     // create a student (transaction-2)
//     const newStudent = await StudentModel.create([payload], { session });

//     if (!newStudent.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return newStudent;
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error('Failed to create student');
//   }
// };

//TODO which one is better
export const createUserService = async (
  password: string,
  payload: IStudent,
) => {
  const userData: Partial<TUser> = {
    password: password || (config.Default_User_Password as string),
    role: 'student',
  };

  const studentSemester = await SemesterModel.findById(payload.semester);

  if (!studentSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Student semester is null, cannot generate student ID.',
    );
  }

  userData.id = await generateStudentId(studentSemester);

  // Create the user first
  const userResult = await User.create(userData);

  if (!userResult) {
    throw new AppError(httpStatus.NOT_FOUND, 'User creation failed.');
  }

  try {
    // Associate the created user with the student payload
    payload.id = userResult.id;
    payload.user = userResult._id; // reference ID

    // Create the student
    const studentCreatedResult = await StudentModel.create(payload);

    // Return the student creation result if successful
    return studentCreatedResult;
  } catch (error) {
    // If student creation fails, delete the created user
    await User.findByIdAndDelete(userResult._id);
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Student creation failed: ${error}`,
    );
  }
};

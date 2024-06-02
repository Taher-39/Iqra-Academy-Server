import config from '../../config';
import { SemesterModel } from '../Semester/semester.model';
import { IStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { generateStudentId } from './user.utils';
import { TUser } from './user.interface';
import { User } from './user.model';

export const createUserService = async (
  password: string,
  payload: IStudent,
) => {
  const userData: Partial<TUser> = {
    password: password || (config.Default_User_Password as string),
    role: 'student',
  };

  const studentSemester = await SemesterModel.findById(
    payload.admissionSemester,
  );

  if (!studentSemester) {
    throw new Error('Student semester is null, cannot generate student ID.');
  }

  userData.id = await generateStudentId(studentSemester);

  // Create the user first
  const userResult = await User.create(userData);

  if (!userResult) {
    throw new Error('User creation failed.');
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
    throw new Error(`Student creation failed: ${error}`);
  }
};

// export const createUserService = async (
//   password: string,
//   payload: { student: IStudent },
// ) => {
//   const userData: Partial<TUser> = {};
//   userData.password = password || (config.Default_User_Password as string);
//   userData.role = 'student';

//   const { student } = payload;

//   const studentSemester = await SemesterModel.findById(
//     student.addmissionSemester,
//   );

//   if (studentSemester) {
//     userData.id = generateStudentId(studentSemester);
//   } else {
//     return {
//       success: false,
//       message: 'Student semester is null, cannot generate student ID.',
//       error: {},
//     };
//   }

//   try {
//     const result = await User.create(userData);
//     if (result && Object.keys(result).length) {
//       student.id = result.id;
//       student.user = result._id; // reference ID

//       const studentCreatedResult = await StudentModel.create(student);
//       return {
//         success: true,
//         data: studentCreatedResult,
//       };
//     } else {
//       return {
//         success: false,
//         message: 'Failed to create user.',
//         error: {},
//       };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: 'Error occurred while creating user and student.',
//       error: error,
//     };
//   }
// };

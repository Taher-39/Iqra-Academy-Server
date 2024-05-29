import config from '../../config';
import { IStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

export const createUserService = async (
  password: string,
  studentInfo: IStudent,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.Default_User_Password as string);
  userData.role = 'student';
  userData.id = '20250101';
  const result = await User.create(userData);
  if (Object.keys(result).length) {
    studentInfo.id = result.id;
    studentInfo.user = result._id; //refarence ID

    const studentCreatedResult = await StudentModel.create(studentInfo);
    return studentCreatedResult;
  }
};

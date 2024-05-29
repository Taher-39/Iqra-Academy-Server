import { StudentModel } from './student.model';

const GetAllStudentInfoIntoDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const GetSingleStudentInfoIntoDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  GetAllStudentInfoIntoDB,
  GetSingleStudentInfoIntoDB,
};

import { SemesterNameAndCodeMapper } from './semester.constant';
import { TSemester } from './semester.interface';
import { SemesterModel } from './semester.model';

export const createSemesterService = async (payload: TSemester) => {
  if (SemesterNameAndCodeMapper[payload.name] !== payload.code) {
    throw new Error('Academic Semester And Code Not Match!');
  }
  const result = await SemesterModel.create(payload);
  return result;
};

export const getAllSemesterService = async () => {
  const result = await SemesterModel.find();
  return result;
};

export const getSingleSemesterService = async (semesterId: string) => {
  const result = await SemesterModel.findById(semesterId);
  return result;
};

export const updateSingleSemesterService = async (
  semesterId: string,
  payload: Partial<TSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    SemesterNameAndCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Semester code and name not Match');
  }
  const result = await SemesterModel.findOneAndUpdate(
    { _id: semesterId },
    payload,
    { new: true, runValidators: true },
  );
  return result;
};

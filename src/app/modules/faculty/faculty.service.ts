import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

export const facultyCreateService = async (payload: TFaculty) => {
  const result = await Faculty.create(payload);
  return result;
};
export const getAllFacultService = async () => {
  const result = await Faculty.find();
  return result;
};
export const getSingleFacultService = async (facultyId: string) => {
  const result = await Faculty.findById(facultyId);
  return result;
};
export const updateFacultService = async (
  facultyId: string,
  payload: TFaculty,
) => {
  const result = await Faculty.findOneAndUpdate({ _id: facultyId }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

import { TDepartment } from './department.interface';
import { Department } from './department.model';

export const departmentCreateService = async (payload: TDepartment) => {
  const result = await Department.create(payload);
  return result;
};
export const getAllDepartmentService = async () => {
  const result = await Department.find().populate("faculty");
  return result;
};
export const getSingleDepartmentService = async (departmentId: string) => {
  const result = await Department.findById(departmentId).populate("faculty");
  return result;
};
export const updateDepartmentService = async (
  departmentId: string,
  payload: TDepartment,
) => {
  const result = await Department.findOneAndUpdate(
    { _id: departmentId },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

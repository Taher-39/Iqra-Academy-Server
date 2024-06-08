import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import {
  departmentCreateService,
  getAllDepartmentService,
  getSingleDepartmentService,
  updateDepartmentService,
} from './department.service';

export const departmentCreateController = catchAsync(async (req, res) => {
  const result = await departmentCreateService(req.body);
  sendResponce(res, {
    statusCode: httpStatus.CREATED,
    message: 'department Craeted Successfully',
    data: result,
  });
});
export const getAllDepartmentController = catchAsync(async (req, res) => {
  const result = await getAllDepartmentService();
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'All Department Get Successfully',
    data: result,
  });
});
export const getSingleDepartmentController = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await getSingleDepartmentService(departmentId);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'Department Get Successfully',
    data: result,
  });
});
export const updateDepartmentController = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result = await updateDepartmentService(departmentId, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'Department Update Successfully',
    data: result,
  });
});

import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import {
  facultyCreateService,
  getAllFacultService,
  getSingleFacultService,
  updateFacultService,
} from './faculty.service';

export const facultyCreateController = catchAsync(async (req, res) => {
  const result = await facultyCreateService(req.body);
  sendResponce(res, {
    statusCode: httpStatus.CREATED,
    message: 'Faculty Craeted Successfully',
    data: result,
  });
});
export const getAllFacultyController = catchAsync(async (req, res) => {
  const result = await getAllFacultService();
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'All Faculty Get Successfully',
    data: result,
  });
});
export const getSingleFacultController = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await getSingleFacultService(facultyId);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty Get Successfully',
    data: result,
  });
});
export const updateFacultyController = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result = await updateFacultService(facultyId, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'Faculty Update Successfully',
    data: result,
  });
});

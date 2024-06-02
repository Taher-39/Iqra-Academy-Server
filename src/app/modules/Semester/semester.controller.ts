// import { userValidationSchema } from './user.validation';
import httpStatus from 'http-status';
import { sendResponce } from '../../utils/sendResponce';
import {
  createSemesterService,
  getAllSemesterService,
  getSingleSemesterService,
  updateSingleSemesterService,
} from './semester.service';
import { catchAsync } from '../../utils/catchAsync';
import mongoose from 'mongoose';
import { TSemester } from './semester.interface';

export const craeteSemesterController = catchAsync(async (req, res) => {
  const result = await createSemesterService(req.body);
  sendResponce(res, {
    statusCode: httpStatus.CREATED,
    message: 'User Semester Created Successfully',
    data: result,
  });
});
export const getAllSemesterController = catchAsync(async (req, res) => {
  const result = await getAllSemesterService();
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'All User Semester Get Successfully',
    data: result,
  });
});
export const getSingleSemesterController = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(semesterId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid semester ID format',
    });
  }

  const result = await getSingleSemesterService(semesterId);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Semester not found',
    });
  }
  sendResponce(res, {
    statusCode: httpStatus.CREATED,
    message: 'Single Semester Get Successfully',
    data: result,
  });
});

export const updateSingleSemesterController = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const payload: Partial<TSemester> = req.body;

  if (!mongoose.Types.ObjectId.isValid(semesterId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid semester ID format',
    });
  }
  const result = await updateSingleSemesterService(semesterId, payload);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'Semester not found',
    });
  }
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'Semester Successfully Updated',
    data: result,
  });
});

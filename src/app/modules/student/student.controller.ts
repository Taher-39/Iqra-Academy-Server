/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import {
  StudentServices,
  deleteStudentService,
  updateStudentService,
} from './student.services';
import { sendResponce } from '../../utils/sendResponce';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

export const AllStudentGetController = catchAsync(async (req, res) => {
  const result = await StudentServices.GetAllStudentInfoIntoDB();
  if (!result) {
    return res.status(400).json({
      success: false,
      message: 'Student information not find.',
    });
  }
  sendResponce(res, {
    statusCode: httpStatus.CREATED,
    message: 'Student Created Successfully',
    data: result,
  });
});
export const SingleStudentGetController = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.GetSingleStudentInfoIntoDB(studentId);
  if (!result) {
    return res.status(400).json({
      success: false,
      message: 'Student information not find.',
    });
  }
  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'Student information get successfully.',
    data: result,
  });
});

export const updateStudentController = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await updateStudentService(studentId, student);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'Student is deleted succesfully',
    data: result,
  });
});
export const deleteStudentController = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await deleteStudentService(studentId);

  sendResponce(res, {
    statusCode: httpStatus.OK,
    message: 'Student is update succesfully',
    data: result,
  });
});


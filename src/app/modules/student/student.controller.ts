/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.services';
import { sendResponce } from '../../utils/sendResponce';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';



const AllStudentGetInfoController = catchAsync(async (req, res) => {
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
const SingleStudentGetInfoController = catchAsync(async (req, res) => {
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

export const StudentController = {
  AllStudentGetInfoController,
  SingleStudentGetInfoController,
};

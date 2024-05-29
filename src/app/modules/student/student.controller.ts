import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.services';
import { sendResponce } from '../../utils/sendResponce';
import httpStatus from 'http-status';
const AllStudentGetInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
const SingleStudentGetInfoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  AllStudentGetInfoController,
  SingleStudentGetInfoController,
};

// import { userValidationSchema } from './user.validation';
import httpStatus from 'http-status';
import { sendResponce } from '../../utils/sendResponce';
import { createUserService } from './user.service';
import { NextFunction, Request, Response } from 'express';

export const craeteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentInfo } = req.body;
    // const parseUser = userValidationSchema.parse(user);
    const result = await createUserService(password, studentInfo);
    sendResponce(res, {
      statusCode: httpStatus.CREATED,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: 'Route Not Found!',
    error: '',
  });
};

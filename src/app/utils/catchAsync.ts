import { NextFunction, Request, RequestHandler, Response } from 'express';

export const catchAsync = (fc: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fc).catch((error) => next(error));
  };
};

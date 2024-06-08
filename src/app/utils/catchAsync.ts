import { NextFunction, Request, RequestHandler, Response } from 'express';

export const catchAsync = (fc: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fc(req, res, next)).catch((error) => next(error));
  };
};

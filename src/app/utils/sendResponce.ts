import { Response } from 'express';
type TResponce<T> = {
  statusCode: number;
  message?: string;
  data: T;
};

export const sendResponce = <T>(res: Response, data: TResponce<T>) => {
  res.status(data?.statusCode).json({
    success: true,
    message: data?.message,
    data: data?.data,
  });
};

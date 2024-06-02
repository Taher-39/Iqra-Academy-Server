// import { userValidationSchema } from './user.validation';
import httpStatus from 'http-status';
import { sendResponce } from '../../utils/sendResponce';
import { createUserService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

export const craeteUserController = catchAsync(async (req, res) => {
  const { password, student: studentInfo } = req.body;
  const result = await createUserService(password, studentInfo);
  sendResponce(res, {
    statusCode: httpStatus.CREATED,
    message: 'User Created Successfully',
    data: result,
  });
});

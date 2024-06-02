/* eslint-disable no-undef */
import { Router } from 'express';
import { craeteUserController } from './user.controller';
import { studentValidationSchema } from '../student/student.validation';
import { validateRequest } from '../../middleware/validationRequest';

const router = Router();

router.post(
  '/',
  validateRequest(studentValidationSchema),
  craeteUserController,
);

export const UserRoutes = router;

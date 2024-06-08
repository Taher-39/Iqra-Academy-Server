import express from 'express';
import {
  AllStudentGetController,
  SingleStudentGetController,
  deleteStudentController,
  updateStudentController,
} from './student.controller';
import { validateRequest } from '../../middleware/validationRequest';
import { studentUpdateValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', AllStudentGetController);
router.get('/:studentId', SingleStudentGetController);
router.delete('/:studentId', deleteStudentController);
router.patch(
  '/:studentId',
  validateRequest(studentUpdateValidationSchema),
  updateStudentController,
);

export const StudentRoutes = router;

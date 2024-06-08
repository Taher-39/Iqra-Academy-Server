import { Router } from 'express';
import {
  craeteSemesterController,
  getAllSemesterController,
  getSingleSemesterController,
  updateSingleSemesterController,
} from './semester.controller';
import { validateRequest } from '../../middleware/validationRequest';
import {
  TSemesterUpdateValidationSchema,
  TSemesterValidationSchema,
} from './semester.validation';

const router = Router();
router.post(
  '/',
  validateRequest(TSemesterValidationSchema),
  craeteSemesterController,
);
router.get('/', getAllSemesterController);
router.get('/:semesterId', getSingleSemesterController);
router.patch(
  '/:semesterId',
  validateRequest(TSemesterUpdateValidationSchema),
  updateSingleSemesterController,
);

export const SemesterRoutes = router;

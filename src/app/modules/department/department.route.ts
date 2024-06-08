import { Router } from 'express';
import { validateRequest } from '../../middleware/validationRequest';
import {
  departmentUpdateValidationSchema,
  departmentValidationSchema,
} from './department.validation';
import {
  departmentCreateController,
  getAllDepartmentController,
  getSingleDepartmentController,
  updateDepartmentController,
} from './department.controller';
const router = Router();

router.post(
  '/',
  validateRequest(departmentValidationSchema),
  departmentCreateController,
);
router.get('/', getAllDepartmentController);
router.get('/:departmentId', getSingleDepartmentController);
router.patch(
  '/:departmentId',
  validateRequest(departmentUpdateValidationSchema),
  updateDepartmentController,
);

export const DepartmentRoutes = router;

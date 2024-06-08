import { Router } from 'express';
import { validateRequest } from '../../middleware/validationRequest';
import { facultyValidationSchema } from './faculty.validation';
import { facultyCreateController, getAllFacultyController, getSingleFacultController, updateFacultyController } from './faculty.controller';
const router = Router();

router.post(
  '/',
  validateRequest(facultyValidationSchema),
  facultyCreateController,
);
router.get(
  '/',
  getAllFacultyController,
);
router.get(
  '/:facultyId',
  getSingleFacultController,
);
router.patch(
  '/:facultyId',
  validateRequest(facultyValidationSchema),
  updateFacultyController,
);

export const FacultyRoutes = router;

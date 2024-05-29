import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.get('/', StudentController.AllStudentGetInfoController);
router.get('/:studentId', StudentController.SingleStudentGetInfoController);

export const StudentRoutes = router;

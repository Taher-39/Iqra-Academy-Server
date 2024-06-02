import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/Semester/semester.route';

export const router = Router();

export const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/semesters',
    route: SemesterRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

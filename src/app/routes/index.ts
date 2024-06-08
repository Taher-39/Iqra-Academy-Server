import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/Semester/semester.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { DepartmentRoutes } from '../modules/department/department.route';

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
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

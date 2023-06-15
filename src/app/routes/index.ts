import { SemesterRoute } from './../modules/academicSemester/AcademicSemesterRoute'
import express from 'express'
import { UserRoute } from '../users/user.routes'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { StudentRoutes } from '../modules/Student/student.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semesters',
    route: SemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router

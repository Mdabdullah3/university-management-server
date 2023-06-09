import express from 'express'
import { UserRoutes } from '../modules/users/user.routes'
import { SemesterRoute } from '../modules/academicSemester/AcademicSemesterRoute'

const router = express.Router()

const modulesRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/semester',
    route: SemesterRoute,
  },
]

modulesRoute.forEach(route => router.use(route.path, route.route))

export default router

import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../../Middlewares/vallidateRequest'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculy
)

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
)

export const UserRoute = router

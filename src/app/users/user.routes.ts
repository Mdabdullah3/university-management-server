import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../Middlewares/vallidateRequest'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)

export const UserRoute = router

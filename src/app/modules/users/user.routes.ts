import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../Middlewares/vallidateRequest'
import { UserValidation } from './user.validation'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router

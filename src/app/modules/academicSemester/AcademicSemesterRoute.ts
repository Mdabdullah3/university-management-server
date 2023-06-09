import express from 'express'
import { AcademicSemesterValidation } from './academicSemesterValidation'
import validateRequest from '../../Middlewares/vallidateRequest'
import { AcademicSemesterController } from './academicSemesterController'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

export const SemesterRoute = router

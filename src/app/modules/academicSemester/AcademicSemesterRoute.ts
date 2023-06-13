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
router.get('/:id', AcademicSemesterController.getSingleSemester)

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
)
router.delete('/:id', AcademicSemesterController.deleteSemester)

router.get('/', AcademicSemesterController.getAllSemester)
router.get('/:id', AcademicSemesterController.getAllSemester)

export const SemesterRoute = router

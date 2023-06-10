import { AcademicSemesterService } from './academicSemesterServer'
import catchAsync from '../../../shared/catchAsync'
import { NextFunction, Request, Response } from 'express'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    res.status(200).json({
      success: true,
      message: 'Academic semester is created successfully!',
      data: result,
    })
    next()
  }
)

export const AcademicSemesterController = {
  createSemester,
}

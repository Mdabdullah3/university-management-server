import { AcademicSemesterService } from './academicSemesterService'
import catchAsync from '../../../shared/catchAsync'
import { NextFunction, Request, Response } from 'express'
import sendReponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IAcademicSamseter } from './academicSemester.interface'
import pick from '../../../shared/pick'
import { paginationField } from '../../../constants/pagination'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    sendReponse<IAcademicSamseter>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Created By Succesfully !',
      data: result,
    })
    next()
  }
)

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginnationOptions = pick(req.query, paginationField)
    const result = await AcademicSemesterService.getAllSemester(
      paginnationOptions
    )
    sendReponse<IAcademicSamseter[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Retirieved Succesfully',
      meta: result.meta,
      data: result.data,
    })
  }
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
}

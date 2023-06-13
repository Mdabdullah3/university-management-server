import { AcademicSemesterService } from './academicSemesterService'
import catchAsync from '../../../shared/catchAsync'
import { NextFunction, Request, Response } from 'express'
import sendReponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IAcademicSamseter } from './academicSemester.interface'
import pick from '../../../shared/pick'
import { paginationField } from '../../../constants/pagination'
import { academicSemesterfilterField } from './academicSemesterConstant'

// Create a Semester
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

// pagination Code Here

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filter = pick(req.query, academicSemesterfilterField)
    const paginnationOptions = pick(req.query, paginationField)
    const result = await AcademicSemesterService.getAllSemester(
      filter,
      paginnationOptions
    )
    sendReponse<IAcademicSamseter[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Retirieved Succesfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  }
)

// Get Single semester Controller

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.getSingleSemester(id)

  sendReponse<IAcademicSamseter>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully !',
    data: result,
  })
})

// Update a semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AcademicSemesterService.updateSemester(id, updatedData)

  sendReponse<IAcademicSamseter>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully !',
    data: result,
  })
})

// Delete a Semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemester(id)

  sendReponse<IAcademicSamseter>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully !',
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}

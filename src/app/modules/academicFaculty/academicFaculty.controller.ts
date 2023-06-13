import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { academicFacultyFilterableFields } from './academicFaculty.constants'
import { IAcademicFaculty } from './academicFaculty.interfaces'
import { AcademicFacultyService } from './academicFaculty.service'
import catchAsync from '../../../shared/catchAsync'
import sendReponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationField } from '../../../constants/pagination'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyService.createFaculty(academicFacultyData)
  sendReponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationField)

  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  )

  sendReponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.getSingleFaculty(id)

  sendReponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty fetched successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedData = req.body
    const result = await AcademicFacultyService.updateFaculty(id, updatedData)

    sendReponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    })
  })
)

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.deleteByIdFromDB(id)

  sendReponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}

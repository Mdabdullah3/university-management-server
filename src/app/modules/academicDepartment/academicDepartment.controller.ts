import { Request, Response } from 'express'
import httpStatus from 'http-status'

import { academicDepartmentFilterableFields } from './academicDepartment.constants'
import { IAcademicDepartment } from './academicDepartment.interfaces'
import { AcademicDepartmentService } from './academicDepartment.service'
import catchAsync from '../../../shared/catchAsync'
import sendReponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationField } from '../../../constants/pagination'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  )

  sendReponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationField)

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )

  sendReponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments fetched successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.getSingleDepartment(id)

  sendReponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.updateDepartment(id, req.body)

  sendReponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  })
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.deleteDepartment(id)

  sendReponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartment,
}

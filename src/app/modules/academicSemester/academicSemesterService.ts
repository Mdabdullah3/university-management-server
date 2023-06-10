import httpStatus from 'http-status'
import ApiError from '../../../Errors/ApiError'
import { AcademicSemester } from './academicSemester.Model'
import { IAcademicSamseter } from './academicSemester.interface'
import { academicSemesterTitleCodeMapper } from './academicSemesterConstant'
import { IPaginnationOptions } from './pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payload: IAcademicSamseter
): Promise<IAcademicSamseter> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemester = async (
  paginnationOptions: IPaginnationOptions
): Promise<IGenericResponse<IAcademicSamseter[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginnationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const result = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
}

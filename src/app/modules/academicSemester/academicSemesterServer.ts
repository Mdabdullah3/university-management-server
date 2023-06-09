import httpStatus from 'http-status'
import ApiError from '../../../Errors/ApiError'
import { AcademicSemester } from './academicSemester.Model'
import { IAcademicSamseter } from './academicSemester.interface'
import { academicSemesterTitleCodeMapper } from './academicSemesterConstant'

const createSemester = async (
  payload: IAcademicSamseter
): Promise<IAcademicSamseter> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

export const AcademicSemesterService = {
  createSemester,
}

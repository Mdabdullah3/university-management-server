import { AcademicSemester } from './academicSemester.Model'
import { IAcademicSamseter } from './academicSemester.interface'

const createSemester = async (
  payload: IAcademicSamseter
): Promise<IAcademicSamseter> => {
  const result = await AcademicSemester.create(payload)
  return result
}

export const AcademicSemesterService = {
  createSemester,
}

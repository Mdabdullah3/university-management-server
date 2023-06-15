import httpStatus from 'http-status'
import ApiError from '../../../Errors/ApiError'
import { AcademicSemester } from './academicSemester.Model'
import {
  IAcademicFilter,
  IAcademicSamseter,
} from './academicSemester.interface'
import {
  academicSemesterSearchFields,
  academicSemesterTitleCodeMapper,
} from './academicSemesterConstant'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'
import { IPaginnationOptions } from '../../../interfaces/pagination'
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
  filters: IAcademicFilter,
  paginnationOptions: IPaginnationOptions
): Promise<IGenericResponse<IAcademicSamseter[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginnationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const whereConditons = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await AcademicSemester.find(whereConditons)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments(whereConditons)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// Get Single Semester By Id
const getSingleSemester = async (
  id: string
): Promise<IAcademicSamseter | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

// Update a single semester
const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSamseter>
): Promise<IAcademicSamseter | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

// Delete a Semester
const deleteSemester = async (
  id: string
): Promise<IAcademicSamseter | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}

// const andCondition = [
//   {
//     $or: [
//       {
//         title: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       },
//       {
//         code: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       },
//       {
//         year: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       },
//     ],
//   },
// ]

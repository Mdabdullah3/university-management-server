import { Schema, model } from 'mongoose'
import {
  AcademicSemesterModel,
  IAcademicSamseter,
} from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterTitle,
} from './academicSemesterConstant'
import ApiError from '../../../Errors/ApiError'
import httpStatus from 'http-status'
const academicSemesterSchema = new Schema<IAcademicSamseter>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
  },
  {
    timestamps: true,
  }
)

// Handling Same year and same Samester
// data -> check -? same yaar && same samester

academicSemesterSchema.pre('save', async function (next) {
  const isExit = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExit) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Samester is Already Exit !'
    )
  }
  next()
})

export const AcademicSemester = model<IAcademicSamseter, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)

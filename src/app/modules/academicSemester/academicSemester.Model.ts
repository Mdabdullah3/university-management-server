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

export const AcademicSemester = model<IAcademicSamseter, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)

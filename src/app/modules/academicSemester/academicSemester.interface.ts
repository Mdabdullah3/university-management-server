import { Model } from 'mongoose'

export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export type IAcademicSamesterTitle = 'Autumn' | 'Summer' | 'Fall'
export type IAcademicSamesterCode = '01' | '02' | '03'
export type IAcademicSamseter = {
  title: IAcademicSamesterTitle
  year: string
  code: IAcademicSamesterCode
  startMonth: IAcademicSemesterMonth
  endMonth: IAcademicSemesterMonth
}

export type AcademicSemesterModel = Model<IAcademicSamseter>

export type IAcademicFilter = {
  searchTerm?: string
}

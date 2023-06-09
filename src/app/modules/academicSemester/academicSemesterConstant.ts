import { IAcademicSamesterCode } from './academicSemester.interface'
import {
  IAcademicSamesterTitle,
  IAcademicSemesterMonth,
} from './academicSemester.interface'

export const AcademicSemesterMonth: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const AcademicSemesterTitle: IAcademicSamesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const AcademicSemesterCode: IAcademicSamesterCode[] = ['01', '02', '03']

export const academicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

import { z } from 'zod'
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterTitle,
} from './academicSemesterConstant'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitle] as [string, ...string[]], {
      required_error: 'Title is Required',
    }),
    year: z.number({
      required_error: 'Year is Required',
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      required_error: 'Code is Required ',
    }),
    startMonth: z.enum([...AcademicSemesterMonth] as [string, ...string[]], {
      required_error: 'Start Month is Required',
    }),
    endMonth: z.enum([...AcademicSemesterMonth] as [string, ...string[]], {
      required_error: 'End Month is Required',
    }),
  }),
})
///  Ensure 1: Route Level : Update -->  Give me title and code both , neither

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitle] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z
        .enum([...AcademicSemesterCode] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...AcademicSemesterMonth] as [string, ...string[]], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMonth] as [string, ...string[]], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  )

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}

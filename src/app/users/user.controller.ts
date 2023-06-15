import { Request, Response } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import httpStatus from 'http-status'
import catchAsync from '../../shared/catchAsync'
import { UserService } from './user.servers'
import sendReponse from '../../shared/sendResponse'
import { IUser } from './user.interface'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)

    sendReponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  }
)

export const UserController = {
  createStudent,
}

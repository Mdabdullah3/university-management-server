import { UserService } from './user.servers'
import catchAsync from '../../../shared/catchAsync'
import { NextFunction, Request, Response } from 'express'
import sendReponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    const result = await UserService.createUser(user)
    next()
    // res.status(200).json({
    //   success: true,
    //   message: 'user created successfully!',
    //   data: result,
    // })
    sendReponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  }
)

export const UserController = {
  createUser,
}

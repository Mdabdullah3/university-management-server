import { RequestHandler } from 'express-serve-static-core'
import { UserService } from './user.servers'
// import { z } from 'zod'
const createUser: RequestHandler = async (req, res, next) => {
  try {
    // const createUserZodSchema = z.object({
    //   body: z.object({
    //     role: z.string({
    //       required_error: 'Role is Required',
    //     }),
    //     password: z.string().optional(),
    //   }),
    // })
    // await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}

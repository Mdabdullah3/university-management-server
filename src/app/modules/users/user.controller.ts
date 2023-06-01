import { Response, Request } from 'express'
import userServers from './user.servers'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userServers.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: 'Failed to create user',
    })
  }
}

export default { createUser }

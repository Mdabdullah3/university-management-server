import { User } from './user.model'

export const findlastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findlastUserId()) || (0).toString().padStart(5, '0')

  //   increment by 1
  const increatentalId = (parseInt(currentId) + 1).toString().padStart(5, '0')

  return increatentalId
}

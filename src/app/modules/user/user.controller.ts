import { RequestHandler } from 'express'

import { userService } from './user.services'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'Create user successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}

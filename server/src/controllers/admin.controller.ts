import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
// import { highLevelUsersDto } from '../dto/user.dto'
// import type { User } from '../entities'
import { userService } from '../services/factory/entities.factory'
import { AppError } from '../utils/app.error'

export const getAllDoctorsAndAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requesterId = req.sessionUser?.id
    const { users, count } =
      await userService.findAllDoctorsAndAdmins(requesterId)
    // const usersMinusRequester = users.filter((user) => user.id !== requesterId)
    // const filteredUsers = highLevelUsersDto(usersMinusRequester as User[])

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      users: users, //filteredUsers,
      count: count
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.GET_DOCTORS_AND_ADMINS_ERROR,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

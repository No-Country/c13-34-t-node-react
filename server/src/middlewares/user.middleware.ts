import type { NextFunction, Request, Response } from 'express'
import type { User } from '../entities'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { userService } from '../services'
import { UserStatus } from '../types/user.types'
import { AppError } from '../utils/app.error'

export const userExists = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.safeData?.params
  const filters = { id, status: UserStatus.enable }

  try {
    const user = (await userService.findUser(
      filters,
      false,
      false,
      false
    )) as User

    if (!user)
      throw new AppError(ERROR_MSGS.USER_NOT_FOUND, HTTPCODES.NOT_FOUND)

    req.user = user
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(new AppError(ERROR_MSGS.USER_NOT_FOUND, HTTPCODES.NOT_FOUND))
      return
    }
    next(err)
    return
  }
  next()
}

export const validateYourUser = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const yourUserId = req.sessionUser?.id
  const userId = req.user?.id

  if (yourUserId !== userId) {
    next(
      new AppError(ERROR_MSGS.ACTION_RECTRICTED_TO_OWNER, HTTPCODES.FORBIDDEN)
    )
    return
  }

  next()
}

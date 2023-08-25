import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { userService } from '../services/factory/entities.factory'
import type { DecodedAuth } from '../types/global.types'
import { AppError } from '../utils/app.error'
import { verifyJWT } from '../utils/jwt'

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined

  if (
    req.headers?.authorization &&
    req.headers.authorization?.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1]

  if (!token) {
    next(new AppError(ERROR_MSGS.SESSION_NOT_STARTED, HTTPCODES.UNAUTHORIZED))
    return
  }

  let decoded: DecodedAuth | undefined

  try {
    decoded = (await verifyJWT(token)) as DecodedAuth
  } catch (err) {
    next(err)
    return
  }

  if (!decoded) {
    next(
      new AppError(
        ERROR_MSGS.TOKEN_NOT_DECODED,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    )
    return
  }

  const attributes = {
    password: false,
    status: false
  }

  const userExists = await userService.findUser(
    { id: decoded.id },
    attributes,
    false,
    false
  )

  if (!userExists) {
    next(new AppError(ERROR_MSGS.TOKEN_USER_NOT_FOUND, HTTPCODES.NOT_FOUND))
    return
  }

  if (userExists.passwordChangedAt) {
    const convertToSeconds = userExists.passwordChangedAt.getTime() / 1000
    const changedTimeStamp = parseInt(convertToSeconds.toString(), 10)

    if (decoded.iat < changedTimeStamp) {
      next(
        new AppError(ERROR_MSGS.USER_PASSWORD_CHANGE, HTTPCODES.UNAUTHORIZED)
      )
      return
    }
  }

  req.sessionUser = userExists

  next()
}

export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.sessionUser?.role)) {
      next(new AppError(ERROR_MSGS.PERMISSION_DENIAD, HTTPCODES.FORBIDDEN))
      return
    }
    next()
  }
}

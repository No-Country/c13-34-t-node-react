import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { userService } from '../services/factory/entities.factory'
import { AppError } from '../utils/app.error'

export const approveDoctorsAndAdminsRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const updatedUser = await userService.approveAdminDocsRegistration(
      Number(userId)
    )

    if (updatedUser == null) {
      return res.status(HTTPCODES.BAD_REQUEST).json({
        status: ERROR_MSGS.FAIL,
        message: ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_FAIL,
        updatedUser
      })
    }

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      message: MESSAGES.ADMIN_REGISTRATION_APPROVAL_OK,
      updatedUser
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.ADMIN_REGISTRATION_APPROVAL_ERROR,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const cancelDoctorsAndAdminsRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const canceledUser = await userService.cancelAdminDocsRegistration(
      Number(userId)
    )

    if (canceledUser == null) {
      return res.status(HTTPCODES.BAD_REQUEST).json({
        status: ERROR_MSGS.FAIL,
        message: ERROR_MSGS.ADMIN_REGISTRATION_CANCELATION_FAIL,
        canceledUser
      })
    }

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      message: MESSAGES.ADMIN_REGISTRATION_CANCELATION_OK,
      canceledUser
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.ADMIN_REGISTRATION_CANCELATION_ERROR,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const getAllDoctorsAndAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requesterId = req.sessionUser?.id
    const { users, count } =
      await userService.findAllDoctorsAndAdmins(requesterId)

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      users, // filteredUsers,
      count
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

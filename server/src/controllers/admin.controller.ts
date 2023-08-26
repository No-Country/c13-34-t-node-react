import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { userService } from '../services/factory/entities.factory'
import { AppError } from '../utils/app.error'

// Logica para aprobar / rechazar registros
export const approveRejectDoctorsAndAdminsStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requestId } = req.params
    const { action } = req.body
    console.log('action', action)

    const number = parseInt(requestId)
    const succes = await userService.toggleAdminDocsStatus(number, action)

    if (succes) {
      return res.status(HTTPCODES.OK).json({
        status: MESSAGES.SUCCESS,
        message: MESSAGES.ADMIN_TOGGLE_STATUS_OK
      })
    } else {
      return res.status(HTTPCODES.NOT_FOUND).json({
        status: ERROR_MSGS.FAIL,
        message: MESSAGES.ADMIN_TOGGLE_STATUS_FAIL
      })
    }
  } catch (err) {
    next(
      new AppError(
        MESSAGES.ADMIN_TOGGLE_STATUS_ERROR,
        HTTPCODES.INTERNAL_SERVER_ERROR
      )
    )
  }
}

// Logica para traer doctores y medicos

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

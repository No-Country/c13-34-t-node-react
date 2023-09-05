import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { medicalAppointmentService } from '../services/factory/entities.factory'
import { AppError } from '../utils/app.error'
import type { User } from '../entities/user.entity'
import { MESSAGES } from '../constants/msgs'

export const patientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionUser, safeData } = req

    const newMedicalAppointment =
      await medicalAppointmentService.createMedicalAppointment(
        sessionUser as User,
        safeData?.params.id,
        safeData?.body.description
      )
    return res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      medicalAppointment: newMedicalAppointment
    })
  } catch (err) {
    if (err instanceof AppError) {
      next(err)
    } else {
      next(
        new AppError(ERROR_MSGS.GENERIC_ERROR, HTTPCODES.INTERNAL_SERVER_ERROR)
      )
    }
  }
}

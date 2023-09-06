import type { NextFunction, Request, Response } from 'express'
import type { User } from '../entities'
import { AppError } from '../utils/app.error'
import { medicalAppointmentService, patientService } from '../services'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const createMedicalAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionUser, safeData } = req
    const medicalAppointment =
      await medicalAppointmentService.createMedicalAppointment(
        sessionUser as User,
        safeData?.params.id,
        safeData?.body.description
      )

    return res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      medicalAppointment
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_APPOINTMENT_FAIL_SAVE,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app.error'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { medicalAppointmentDatesService } from '../services/factory/entities.factory'
import { MESSAGES, SUCCESS_MESSAGES } from '../constants/msgs'

export const createDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, hours } = req.safeData?.body
    const medicalAppointmentDates =
      await medicalAppointmentDatesService.createMedicalAppointmentDate(
        date,
        hours
      )

    return res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      message: SUCCESS_MESSAGES.MEDICAL_APPOINTMENT_DATE_CREATE,
      medicalAppointmentDates
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_CREATE_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

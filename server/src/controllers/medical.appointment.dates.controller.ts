import dayjs from 'dayjs'
import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { type User } from '../entities'
import { medicalAppointmentDatesService } from '../services/factory/entities.factory'
import { AppError } from '../utils/app.error'

export const createDates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionUser } = req
    const { date, hours } = req.safeData?.body
    const medicalAppointmentDates =
      await medicalAppointmentDatesService.createMedicalAppointmentDates(
        sessionUser as User,
        date,
        hours
      )

    const datesToFrontEnd = medicalAppointmentDates.map((ele) => {
      return {
        ...ele,
        date: dayjs.unix(Number(ele.date)).format('YYYY-MM-DD HH:mm')
      }
    })

    return res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      message: MESSAGES.MEDICAL_APPOINTMENT_DATE_CREATED,
      medicalAppointmentDates: datesToFrontEnd
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

import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app.error'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { doctorService } from '../services'
import { MESSAGES } from '../constants/msgs'
import { UserStatus } from '../types/user.types'

export const getDoctors = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [doctors, results] = await doctorService.findDoctors(
      {
        user: {
          status: UserStatus.enable
        }
      },
      {
        user: {
          firstName: true,
          lastName: true,
          email: true,
          telephone: true,
          status: true
        },
        medicalAppointmentDates: { id: true, date: true, status: true }
      },
      { user: true, medicalAppointmentDates: true }
    )

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      results,
      doctors
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.DOCTORS_INTERNAL_NOT_FOUND,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

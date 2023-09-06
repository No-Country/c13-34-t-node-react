import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app.error'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { doctorService } from '../services'
import { MESSAGES } from '../constants/msgs'
import { UserStatus } from '../types/user.types'
import { DoctorSpecialty } from '../types/doctor.types'

export const getDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [doctors, results] = await doctorService.findDoctors(
      { specialty: DoctorSpecialty.general },
      false,
      {
        user: {
          status: UserStatus.enable
        },
        medicalAppointmentDates: true
      }
    )

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      results,
      doctors
    })
  } catch (err) {
    console.log(err)
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

import type { NextFunction, Request, Response } from 'express'
import type { User } from '../entities'
import type { HoursType } from '../types/medical.appointment.dates.types'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { medicalAppointmentDatesService } from '../services'
import { AppError } from '../utils/app.error'

export const createDates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionUser } = req
    const { date, hours } = req.safeData?.body
    const { medicalAppointmentDates, doctorId } =
      await medicalAppointmentDatesService.createMedicalAppointmentDates(
        sessionUser as User,
        date,
        hours
      )

    return res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      message: MESSAGES.MEDICAL_APPOINTMENT_DATE_CREATED,
      medicalAppointmentDates,
      doctorId
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

export const toggleStatusMedicalAppointmentDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    await medicalAppointmentDatesService.toggleStatusMedicalAppointmentDate(
      id,
      req?.sessionUser as User
    )
    return res.status(HTTPCODES.NO_CONTENT).json({
      status: MESSAGES.SUCCESS
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_CANCELLED_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const getAllDatesByDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.sessionUser as User
    const [dates, count] =
      await medicalAppointmentDatesService.getAllMedicalAppoitmentDates(id)
    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      dates,
      count
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.GET_ALL_DATES_BY_SINGLE_DOCTOR_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const getAllHoursByDoctorDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.sessionUser as User
    const { date } = req.body

    const response =
      await medicalAppointmentDatesService.getAllMedicalAppoitmentDatesPendingAndSelected(
        id
      )
    const dates = response[0]

    if (Array.isArray(dates)) {
      const matchingHours = dates.filter((item) => {
        const itemDate = item.date.split(' ')[0]
        return itemDate === date
      })

      const hours: HoursType[] = matchingHours.map((item) => {
        const parts = item.date.split(' ')
        const hour = parts[1]
        const obj: HoursType = {
          hour,
          status: item.status ?? ''
        }
        return obj
      })

      return res.status(HTTPCODES.OK).json({
        status: MESSAGES.SUCCESS,
        hours
      })
    }
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.GET_HOURS_FROM_SPECIFIC_DOCTOR_DATE_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const updateToCompletedDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.safeData?.params

    await medicalAppointmentDatesService.completedAppointmentDate(id)

    return res.status(HTTPCODES.NO_CONTENT).json({
      status: MESSAGES.SUCCESS
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_APPOINTMENT_DATE_UPDATE_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
    return
  }
}

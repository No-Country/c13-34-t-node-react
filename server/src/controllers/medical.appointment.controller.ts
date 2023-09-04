import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/app.error'
import { medicalAppointmentService } from '../services/factory/entities.factory'
import type { User } from '../entities'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'

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
      next(new AppError('No se pudo crear la cita médica.', 500))
      return
    }
    next(err)
  }
}

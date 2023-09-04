import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/app.error'

export const createMedicalAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.safeData?.params
    console.log('id del controlador medical appointment', id)
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(new AppError('No se pudo crear la cita médica.', 500))
      return
    }
    next(err)
  }
}

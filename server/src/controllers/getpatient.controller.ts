import type { NextFunction, Request, Response } from 'express'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { AppError } from '../utils/app.error'
import { patientService } from '../services/factory/entities.factory'
export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionUser } = req

    // obtener el id del paciente
    const patient = await patientService.findPatient(
      { id: sessionUser?.params.id },
      false,
      false,
      false
    )

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      patient
    })
  } catch (err) {
    if (err instanceof AppError) {
      next(err)
    }
  }
  next(new AppError(MESSAGES.PATIENT, HTTPCODES.NOT_FOUND))
}

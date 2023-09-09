import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app.error'
import { HTTPCODES } from '../constants/httpCodes'
import { medicalRecordService } from '../services'

export const createMedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.safeData?.params
    const a = await medicalRecordService.createMedicalRecord(
      { hola: 'mundo' },
      id
    )
  } catch (err) {
    console.log(err)
    if (!(err instanceof AppError)) {
      next(new AppError('', HTTPCODES.INTERNAL_SERVER_ERROR))
      return
    }
    next(err)
  }
}

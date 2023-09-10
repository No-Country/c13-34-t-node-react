import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app.error'
import { HTTPCODES } from '../constants/httpCodes'
import { medicalRecordService } from '../services'
import { MESSAGES } from '../constants/msgs'
import { ERROR_MSGS } from '../constants/errorMsgs'

// controller de prueba para verificar relaciones correctamente
export const getMedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.safeData?.params
    const medicalRecord = await medicalRecordService.getMedicalRecord(id)

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      medicalRecord
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_RECORD_NOT_FOUND,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const createMedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { safeData } = req
    const medicalRecord = await medicalRecordService.createMedicalRecord(
      safeData?.body,
      safeData?.params.id
    )

    return res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      medicalRecord
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(new AppError('', HTTPCODES.INTERNAL_SERVER_ERROR))
      return
    }
    next(err)
  }
}

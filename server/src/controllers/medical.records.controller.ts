import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { medicalRecordService } from '../services'
import { AppError } from '../utils/app.error'

export const updateMedicalRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { safeData } = req

    await medicalRecordService.updateMedicalRecord(
      safeData?.params.id,
      safeData?.body
    )

    return res.status(HTTPCODES.NO_CONTENT).json({
      status: MESSAGES.SUCCESS
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_RECORD_NOT_UPDATED,
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
    const { safeData, sessionUser } = req
    const medicalRecord = await medicalRecordService.createMedicalRecord(
      safeData?.body,
      sessionUser?.id,
      safeData?.params.id
    )

    return res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      medicalRecord
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.MEDICAL_RECORD_FAIL_SAVE,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

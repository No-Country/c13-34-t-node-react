import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { patientMedicalHistoryService } from '../services'
import { AppError } from '../utils/app.error'

export const createPatientMedicalHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { safeData } = req
    const patientMedicalHistory =
      await patientMedicalHistoryService.createPatientMedicalHistory(
        safeData?.body,
        safeData?.params.id
      )

    res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      patientMedicalHistory
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.PATIENT_MEDICAL_HISTORY_SAVE_FAIL,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

import type { Request, Response } from 'express'
import { mode, modes } from '../config/config'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { sendErrorDev, sendErrorProd } from '../controllers/error.controller'

export const globalErrorHandler = (err: any, _req: Request, res: Response) => {
  err.statusCode = err.statusCode || HTTPCODES.INTERNAL_SERVER_ERROR
  err.status = err.status || ERROR_MSGS.FAIL

  if (mode === modes.dev) sendErrorDev(err, res)
  if (mode === modes.prod) sendErrorProd(err, res)
}

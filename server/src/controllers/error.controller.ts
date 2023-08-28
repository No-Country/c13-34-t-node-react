import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { mode, modes } from '../config/config'

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || HTTPCODES.INTERNAL_SERVER_ERROR
  err.status = err.status || ERROR_MSGS.FAIL

  if (mode === modes.dev)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      err
    })

  if (mode === modes.prod) {
    if (err.isOperational)
      return res.status(err.statusCode).json({
        status: err.status,
        ...(err.message && { message: err.message }),
        ...(err.errors && { errors: err.errors })
      })

    return res.status(HTTPCODES.INTERNAL_SERVER_ERROR).json({
      status: ERROR_MSGS.FAIL,
      message: ERROR_MSGS.GENERIC_ERROR
    })
  }
}

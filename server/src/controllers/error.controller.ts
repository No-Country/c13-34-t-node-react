import type { Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const sendErrorDev = (err: any, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err
  })
}

export const sendErrorProd = (err: any, res: Response) => {
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      ...(err.message && { message: err.message }),
      ...(err.errors && { errors: err.errors })
    })

  return res.status(500).json({
    status: ERROR_MSGS.FAIL,
    message: ERROR_MSGS.GENERIC_ERROR
  })
}

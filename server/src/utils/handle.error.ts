import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const httpError = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err)
  return res.status(500).json({
    status: ERROR_MSGS.ERROR,
    message: ERROR_MSGS.GENERIC_ERROR
  })
}

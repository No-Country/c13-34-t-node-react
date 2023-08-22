import { Request, Response, NextFunction } from 'express'
import { mode, modes } from '../config/config'
import { sendErrorDev, sendErrorProd } from '../controllers/error.controller'

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'fail'

  if (mode === modes.dev) sendErrorDev(err, res)
  if (mode === modes.prod) sendErrorProd(err, res)
}

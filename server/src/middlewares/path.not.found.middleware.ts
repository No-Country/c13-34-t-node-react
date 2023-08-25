import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'

export const pathNotFound = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(404).json({
    status: ERROR_MSGS.FAIL,
    message: `La ruta ${req.originalUrl} no se encontró.`
  })
}

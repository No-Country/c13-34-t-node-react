import type { NextFunction, Request, Response } from 'express'

export const pathNotFound = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(404).json({
    status: 'fail',
    message: `La Ruta ${req.originalUrl} No Se Encontro.`
  })
}

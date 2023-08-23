import type { NextFunction, Request, Response } from 'express'

export const httpError = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err)
  return res.status(500).json({
    status: 'error',
    message: 'Algo Fallo :('
  })
}

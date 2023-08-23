import { Response } from 'express'

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
    status: 'fail',
    message: 'Algo Salio Mal :('
  })
}

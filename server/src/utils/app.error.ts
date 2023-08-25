import { ERROR_MSGS } from '../constants/errorMsgs'

export class AppError extends Error {
  statusCode: number
  status: string
  isOperational: boolean
  errors: any[] | null

  constructor(message: string | any[], statusCode: number) {
    super(Array.isArray(message) ? ERROR_MSGS.ERRORS : message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4')
      ? ERROR_MSGS.ERROR
      : ERROR_MSGS.FAIL
    this.isOperational = true
    this.errors = Array.isArray(message) ? message : null

    Error.captureStackTrace(this, this.constructor)
  }
}

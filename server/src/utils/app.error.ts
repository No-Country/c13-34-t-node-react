export class AppError extends Error {
  statusCode: number
  status: string
  isOperational: boolean
  errors: Array<any> | null

  constructor(message: string | Array<any>, statusCode: number) {
    super(Array.isArray(message) ? 'errors' : message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail'
    this.isOperational = true
    this.errors = Array.isArray(message) ? message : null

    Error.captureStackTrace(this, this.constructor)
  }
}
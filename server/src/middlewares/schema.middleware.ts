import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'
import { AppError } from '../utils/app.error'

export const schemaValidator = (schema: AnyZodObject) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<Response | any> => {
    const results = await schema.safeParseAsync({
      body: req.body,
      params: req.params
    })

    if (!results.success) {
      const errors = results.error.issues.map((issue) => {
        return {
          code: issue.code,
          path: issue.path,
          message: issue.message
        }
      })

      return next(new AppError(errors, 400))
    }

    req.safeData = results.data

    next()
  }
}

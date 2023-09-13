import type { NextFunction, Request, Response } from 'express'
import type { AnyZodObject } from 'zod'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
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
        if (issue.message === MESSAGES.DATE_OF_BIRTH_DEFAULT_ERROR) {
          issue.message = MESSAGES.DATE_OF_BIRTH_INVALID_DATE
        }
        return {
          code: issue.code,
          path: issue.path,
          message: issue.message
        }
      })

      next(new AppError(errors, HTTPCODES.BAD_REQUEST))
      return
    }
    if (req.safeData?.params || req.safeData?.body) {
      const { params, body } = req.safeData

      req.safeData = results.data

      if (params) req.safeData.params = params

      if (body) req.safeData.body = body
    } else {
      req.safeData = results.data
    }

    next()
  }
}

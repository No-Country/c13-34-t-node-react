import jwt, { type JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../config/config'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { AppError } from './app.error'

export const verifyJWT = async (
  token: string
): Promise<JwtPayload | string> => {
  return await new Promise((resolve) => {
    jwt.verify(token, jwtConfig.secret, {}, (err, decoded) => {
      if (err instanceof jwt.JsonWebTokenError) {
        if (err.message === ERROR_MSGS.JWT_INVALID_TOKEN) {
          throw new AppError(
            ERROR_MSGS.SESSION_EXPIRED,
            HTTPCODES.INTERNAL_SERVER_ERROR
          )
        }
        if (
          err.message === ERROR_MSGS.JWT_MALFORMED ||
          err.message === ERROR_MSGS.JWT_INVALID_SIGNATURE
        ) {
          throw new AppError(
            ERROR_MSGS.SESSION_DATA_TAMPERED,
            HTTPCODES.INTERNAL_SERVER_ERROR
          )
        }
      }
      if (err) throw new AppError(err.message, HTTPCODES.BAD_REQUEST)
      if (!decoded)
        throw new AppError(
          ERROR_MSGS.TOKEN_INFO_RETRIEVAL_ERROR,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      resolve(decoded)
    })
  })
}

export const generateJWT = async (data: object): Promise<string> => {
  return await new Promise((resolve) => {
    jwt.sign(
      data,
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn },
      (err, token) => {
        if (err instanceof jwt.JsonWebTokenError) {
          if (err.message === ERROR_MSGS.JWT_INVALID_TOKEN) {
            throw new AppError(
              ERROR_MSGS.SESSION_EXPIRED,
              HTTPCODES.INTERNAL_SERVER_ERROR
            )
          }
          if (
            err.message === ERROR_MSGS.JWT_MALFORMED ||
            err.message === ERROR_MSGS.JWT_INVALID_SIGNATURE
          ) {
            throw new AppError(
              ERROR_MSGS.SESSION_DATA_TAMPERED,
              HTTPCODES.INTERNAL_SERVER_ERROR
            )
          }
        }
        if (err) throw new AppError(err.message, HTTPCODES.BAD_REQUEST)
        if (!token)
          throw new AppError(
            ERROR_MSGS.TOKEN_GENERATION_ERROR,
            HTTPCODES.INTERNAL_SERVER_ERROR
          )
        resolve(token)
      }
    )
  })
}

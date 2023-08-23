import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { jwtConfig } from '../config/config'
import { AppError } from './app.error'

export const verifyJWT = (token: string): Promise<JwtPayload | string> => {
  return new Promise((res, rej) => {
    jwt.verify(token, jwtConfig.secret, {}, (err, decoded) => {
      if (err) throw new AppError(err.message, 400)
      if (!decoded)
        throw new AppError(
          'No se pudo recuperar la información del token.',
          500
        )
      res(decoded)
    })
  })
}

export const generateJWT = (data: object): Promise<string> => {
  return new Promise((res, rej) => {
    jwt.sign(
      data,
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn },
      (err, token) => {
        if (err) throw new AppError(err.message, 400)
        if (!token) throw new AppError('No se genero el token.', 500)
        res(token)
      }
    )
  })
}

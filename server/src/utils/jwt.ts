import jwt, { type JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../config/config'
import { AppError } from './app.error'

export const verifyJWT = async (
  token: string
): Promise<JwtPayload | string> => {
  return await new Promise((resolve) => {
    jwt.verify(token, jwtConfig.secret, {}, (err, decoded) => {
      if (err) throw new AppError(err.message, 400)
      if (!decoded)
        throw new AppError(
          'No se pudo recuperar la información del token.',
          500
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
        if (err) throw new AppError(err.message, 400)
        if (!token) throw new AppError('No se genero el token.', 500)
        resolve(token)
      }
    )
  })
}

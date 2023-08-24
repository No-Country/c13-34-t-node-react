import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/app.error'
import { verifyJWT } from '../utils/jwt'
import { userService } from '../services/factory/entities.factory'
import type { DecodedAuth } from '../types/global.types'

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1]

  if (!token) {
    next(
      new AppError('No haz iniciado sesión, ¡Por favor inicia sesión!.', 401)
    )
    return
  }

  let decoded: DecodedAuth | undefined

  try {
    decoded = (await verifyJWT(token)) as DecodedAuth
  } catch (err) {
    next(err)
    return
  }

  if (!decoded) {
    next(new AppError('El token no se decodifico.', 500))
    return
  }

  const attributes = {
    password: false,
    status: false
  }
  const userExists = await userService.findUser(
    { id: decoded.id },
    attributes,
    false,
    false
  )

  if (!userExists) {
    next(new AppError('El usuario del token no existe.', 404))
    return
  }

  if (userExists.passwordChangedAt) {
    const convertToSeconds = userExists.passwordChangedAt.getTime() / 1000
    const changedTimeStamp = parseInt(convertToSeconds.toString(), 10)

    if (decoded.iat < changedTimeStamp) {
      next(
        new AppError(
          'El usuario cambio su contraseña recientemente. Vuelve a iniciar sesión.',
          401
        )
      )
      return
    }
  }

  req.sessionUser = userExists

  next()
}

export const restrictTo = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.sessionUser?.role)) {
      next(new AppError('Acción denegada, no tienes permisos.', 403))
      return
    }
    next()
  }
}

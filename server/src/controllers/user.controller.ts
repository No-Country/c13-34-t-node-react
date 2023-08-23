import { Response, Request, NextFunction } from 'express'
import { userService } from '../services/factory/entities.factory'
import { AppError } from '../utils/app.error'
import type { User } from '../entities/'
import type { Login } from '../types/user.types'

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.safeData?.body as User)

    return res.status(201).json({
      status: 'success',
      user
    })
  } catch (err) {
    if (!(err instanceof AppError))
      return next(new AppError('No Se Pudo Guardar El Usuario.', 500))
    next(err)
  }
}

export const singIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, user } = await userService.signIn(
      req.safeData?.body as Login
    )

    return res.status(200).json({
      status: 'success',
      token,
      user
    })
  } catch (err) {
    if (!(err instanceof AppError))
      return next(new AppError('No se pudo autenticar el usuario.', 500))
    next(err)
  }
}

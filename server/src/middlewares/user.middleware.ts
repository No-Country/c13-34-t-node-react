import type { NextFunction, Request, Response } from 'express'
import { userService } from '../services/factory/entities.factory'
import { UserStatus } from '../types/user.types'
import { AppError } from '../utils/app.error'
import { User } from '../entities'

export const userExists = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.safeData?.params
  const filters = { id, status: UserStatus.enable }

  try {
    const user = (await userService.findUser(
      filters,
      false,
      false,
      false
    )) as User

    if (!user) throw new AppError('No se encontro el usuario.', 404)

    req.user = user
  } catch (err) {
    if (!(err instanceof AppError)) {
      return next(new AppError('No se pudo encontrar el usuario.', 404))
    }
    return next(err)
  }

  next()
}

export const validateYourUser = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const yourUserId = req.sessionUser?.id
  const userId = req.user?.id

  if (yourUserId !== userId)
    return next(
      new AppError('Solo puedes realizar esta acción con tu usuario.', 403)
    )

  next()
}

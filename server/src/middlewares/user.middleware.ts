import type { NextFunction, Request, Response } from 'express'
import { userService } from '../services/factory/entities.factory'
import { UserStatus } from '../types/user.types'
import { AppError } from '../utils/app.error'
export const userExists = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const newId = Number(id)
  const filters = { id: newId, status: UserStatus.enable }

  try {
    const user = await userService.findUser(filters, false, false, false)
    if (!user) throw new AppError('El usuario no existe.', 404)
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(new AppError('No se pudo encontrar el usuario.', 404))
      return
    }
    next(err)
  }

  next()
}

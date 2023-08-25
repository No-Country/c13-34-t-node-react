import type { NextFunction, Request, Response } from 'express'
import { HTTPCODES } from '../constants/httpCodes'
import { highLevelUsersDto } from '../dto/user.dto'
import type { User } from '../entities'
import { userService } from '../services/factory/entities.factory'
import { UserRole } from '../types/user.types'
import { AppError } from '../utils/app.error'

export const getAllDoctorsAndAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = [
      {
        role: UserRole.admin
      },
      { role: UserRole.doctor }
    ]

    const [users, results] = await userService.findAllUsers(
      filters,
      false,
      false
    )
    const filteredUsers = highLevelUsersDto(users as User[])

    return res.status(HTTPCODES.OK).json({
      status: 'succes',
      users: filteredUsers,
      count: results
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError('No se pudo obtener los médicos y administradores.', 500)
      )
      return
    }
    next(err)
  }
}

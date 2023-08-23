import { Response, type Request, NextFunction } from 'express'
import { userService } from '../services/factory/entities.factory'
import { AppError } from '../utils/app.error'
import { User } from '../entities/'

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
  } catch (e) {
    console.log(e)
    next(new AppError('No Se Pudo Guardar El Usuario.', 500))
  }
}

export const singIn = (_req: Request, res: Response) => {
  res.send('singIn')
}

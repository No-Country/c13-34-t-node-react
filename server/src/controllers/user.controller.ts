import { type NextFunction, type Request, type Response } from 'express'
import { type User } from '../entities/'
import { userService } from '../services/factory/entities.factory'
import type { Login } from '../types/user.types'
import { AppError } from '../utils/app.error'

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
    if (!(err instanceof AppError)) {
      next(new AppError('No Se Pudo Guardar El Usuario.', 500))
      return
    }
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
    if (!(err instanceof AppError)) {
      next(new AppError('No se pudo autenticar el usuario.', 500))
      return
    }
    next(err)
  }
}

// //Leer los usuarios
// export const getUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
//   ) =>{
//   try {
//     const users = await userService.getUsers User.find()
//     return res.json(users)

//   } catch (err) {
//     if (!(err instanceof AppError))
//       return next(new AppError('No se pudo autenticar el usuario.', 500))
//     next(err)
//   }
//     next()
// }

// export const updateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) =>{
//  try {
//   const {id} = req.params;

//   const user = await User.findOneBy({ id: parseInt(req.params.id)});

//   if (!user) return res.status(404).json({message: "User does not exists"})

//   await User.update({ id: parseInt(id)}, req.body)

//  } catch (err) {
//   if (!(err instanceof AppError))
//    return next(new AppError('No se pudo autenticar el usuario.', 500))
//   next(err)
//  }

// }

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.disableUser(req.safeData?.params)

    return res.status(204).json({
      status: 'success'
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(new AppError('No se pudo autenticar el usuario.', 500))
      return
    }
    next(err)
  }
}

// export const getUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
//   )=>{
//    try {
//     const {id} = req.params
//     const user = await User.findOneBy({id: parseInt(id)})
//     return res.json(user)

//    } catch (err) {
//     if (!(err instanceof AppError))
//       return next(new AppError('No se pudo autenticar el usuario.', 500))
//     next(err)
//    }
//   }

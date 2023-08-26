import type { NextFunction, Request, Response } from 'express'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { MESSAGES } from '../constants/msgs'
import { type User } from '../entities/'
import { userService } from '../services/factory/entities.factory'
import { type Login } from '../types/user.types'
import { AppError } from '../utils/app.error'

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.safeData?.body as User)
    return res.status(HTTPCODES.CREATED).json({
      status: MESSAGES.SUCCESS,
      user
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.USER_SAVE_ERROR,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
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

    return res.status(HTTPCODES.OK).json({
      status: MESSAGES.SUCCESS,
      token,
      user
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.USER_AUTHENTICATION_ERROR,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
      return
    }
    next(err)
  }
}

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, safeData } = req

    await userService.updateUserPass(user as User, safeData?.body)

    return res.status(HTTPCODES.NO_CONTENT).json({
      status: MESSAGES.SUCCESS
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.PASSWORD_CHANGE_ERROR,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
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

    return res.status(HTTPCODES.NO_CONTENT).json({
      status: MESSAGES.SUCCESS
    })
  } catch (err) {
    if (!(err instanceof AppError)) {
      next(
        new AppError(
          ERROR_MSGS.USER_AUTHENTICATION_ERROR,
          HTTPCODES.INTERNAL_SERVER_ERROR
        )
      )
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

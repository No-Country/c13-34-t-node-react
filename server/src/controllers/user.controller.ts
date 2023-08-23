import { Response, Request, NextFunction, response } from 'express'
import { userService } from '../services/factory/entities.factory'
import { AppError } from '../utils/app.error'
import { User } from '../entities/'
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




//crear un nuevo usuario

export const createUser = async (
  req: Request, 
  res: Response,
  next: NextFunction
  ) =>{
  try {
      const {firstName, lastName, email} = req.body

      const user = new User()
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email

      await user.save();

      return res.json(user)
  } catch (err) {
    if (!(err instanceof AppError))
      return next(new AppError('No se pudo autenticar el usuario.', 500))
    next(err)   
  }

}



//Leer los usuarios 
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) =>{

  try {
    const users = await  User.find()
    return res.json(users)

  } catch (err) {
    if (!(err instanceof AppError))
      return next(new AppError('No se pudo autenticar el usuario.', 500))
    next(err)  
  }
}


export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>{
 try {
  const {id} = req.params;

  const user = await User.findOneBy({ id: parseInt(req.params.id)});

  if (!user) return res.status(404).json({message: "User does not exists"})

  await User.update({ id: parseInt(id)}, req.body)

 } catch (err) {
  if (!(err instanceof AppError))
   return next(new AppError('No se pudo autenticar el usuario.', 500))
  next(err)  
 }

}

export const deleteUser = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) =>{
  try {
    const { id } = req.params;
    const result = await User.delete({ id: parseInt(id)})
    
    if (result.affected === 0) {
    return res.status(404).json({message: "User does not exists"})

    }
    return res.sendStatus(204)
  } catch (err) {
    if (!(err instanceof AppError))
      return next(new AppError('No se pudo autenticar el usuario.', 500))
    next(err)
  }
}

export const getUser = async (
  req: Request, 
  res: Response,
  next: NextFunction
  )=>{ 
   try {
    const {id} = req.params
    const user = await User.findOneBy({id: parseInt(id)})
    return res.json(user)

   } catch (err) {
    if (!(err instanceof AppError))
      return next(new AppError('No se pudo autenticar el usuario.', 500))
    next(err)
   }
  } 


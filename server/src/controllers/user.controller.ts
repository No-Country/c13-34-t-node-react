import { Response, type Request } from 'express'
import { userService } from '../services/factory/entities.factory'

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body)
    return res.status(201).json({
      status: 'success',
      user
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      status: 'error',
      message: 'El Usuario No Fue Creado.'
    })
  }
}

export const singIn = (_req: Request, res: Response) => {
  res.send('singIn')
}

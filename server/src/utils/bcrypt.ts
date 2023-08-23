import bcypt from 'bcrypt'
import { salt } from '../config/config'
import { AppError } from './app.error'

export const hashPassword = async (pass: string): Promise<string> => {
  try {
    const saltToHash = await bcypt.genSalt(salt)
    return await bcypt.hash(pass, saltToHash)
  } catch (e) {
    throw new AppError('Ocurrio un error al encriptar la contraseña.', 500)
  }
}

export const comparePasswords = async (pass: string, hashPass: string) => {
  let isCorrect: boolean

  try {
    isCorrect = await bcypt.compare(pass, hashPass)
  } catch (e) {
    throw new AppError('Ocurrio un error al comparar las contraseñas.', 500)
  }

  if (!isCorrect) throw new AppError('Contraseña incorrecta.', 400)
}

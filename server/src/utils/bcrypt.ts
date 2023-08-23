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

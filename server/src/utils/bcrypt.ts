import bcypt from 'bcrypt'
import { salt } from '../config/config'
import { AppError } from './app.error'

export const hashPassword = async (pass: string): Promise<string> => {
<<<<<<< HEAD
  try {
    const saltToHash = await bcypt.genSalt(salt)
    return await bcypt.hash(pass, saltToHash)
  } catch (e) {
    throw new AppError('Ocurrio un error al encriptar la contraseña.', 500)
  }
=======
  const saltToHash = await bcypt.genSalt(salt)
  return await bcypt.hash(pass, saltToHash)
>>>>>>> 8305c98e9781214d3866c62abf142c3f1bbab6fc
}

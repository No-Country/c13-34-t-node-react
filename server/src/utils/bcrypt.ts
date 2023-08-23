import bcypt from 'bcrypt'
import { salt } from '../config/config'

export const hashPassword = async (pass: string): Promise<string> => {
  const saltToHash = await bcypt.genSalt(salt)
  return await bcypt.hash(pass, saltToHash)
}

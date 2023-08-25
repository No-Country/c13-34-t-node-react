import bcypt from 'bcrypt'
import { salt } from '../config/config'
import { ERROR_MSGS } from '../constants/errorMsgs'
import { HTTPCODES } from '../constants/httpCodes'
import { AppError } from './app.error'

export const hashPassword = async (pass: string): Promise<string> => {
  try {
    const saltToHash = await bcypt.genSalt(salt)
    return await bcypt.hash(pass, saltToHash)
  } catch (e) {
    throw new AppError(
      ERROR_MSGS.PASSWORD_ENCRYPTION_ERROR,
      HTTPCODES.INTERNAL_SERVER_ERROR
    )
  }
}

export const comparePasswords = async (pass: string, hashPass: string) => {
  let isCorrect: boolean

  try {
    isCorrect = await bcypt.compare(pass, hashPass)
  } catch (e) {
    throw new AppError(
      ERROR_MSGS.PASSWORD_COMPARISON_ERROR,
      HTTPCODES.INTERNAL_SERVER_ERROR
    )
  }

  if (!isCorrect)
    throw new AppError(ERROR_MSGS.INCORRECT_PASSWORD, HTTPCODES.BAD_REQUEST)
}

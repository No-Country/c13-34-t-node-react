import { ObjectLiteral } from 'typeorm'
import { User } from '../entities'

export const userDto = (user: User & ObjectLiteral) => {
  const { firstName, lastName, telephone, dateOfBirth, genre, email } = user

  return {
    firstName,
    lastName,
    email,
    telephone,
    dateOfBirth,
    genre
  }
}

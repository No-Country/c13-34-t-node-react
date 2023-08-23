import { User } from '../entities'
import { UserDto } from '../types/user.types'

export const userDto = (user: User): UserDto => {
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

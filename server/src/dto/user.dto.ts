import type { User } from '../entities'
import type { UserDto } from '../types/user.types'

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

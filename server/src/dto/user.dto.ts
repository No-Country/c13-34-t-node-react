import type { User } from '../entities'
import type { UserDto } from '../types/user.types'

export const userDto = (user: User): UserDto => {
  const { firstName, lastName, telephone, dateOfBirth, genre, email, role } =
    user

  return {
    firstName,
    lastName,
    email,
    telephone,
    dateOfBirth,
    genre,
    role
  }
}

export const highLevelUsersDto = (users: User[]): UserDto[] => {
  return users.map((user) => {
    const { firstName, lastName, telephone, dateOfBirth, genre, email, role } =
      user
    return {
      firstName,
      lastName,
      email,
      telephone,
      dateOfBirth,
      genre,
      role
    }
  })
}

import { ObjectLiteral } from 'typeorm'
import { User } from '../entities'

export const userDto = (user: User & ObjectLiteral) => {
  return {
    name: user.name,
    lastName: user.lastName,
    telephone: user.telephone,
    dateOfBirth: user.dateOfBirth,
    genre: user.genre
  }
}

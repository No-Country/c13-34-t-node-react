import { type Repository } from 'typeorm'
import { type User } from '../entities'
import { type email } from './global.types'

export enum UserRole {
  admin = 'admin',
  patient = 'patient',
  doctor = 'doctor'
}

export enum UserStatus {
  enable = 'enable',
  disable = 'disable'
}

export enum UserGenre {
  male = 'male',
  female = 'female'
}

export interface UserDto {
  firstName: string
  lastName: string
  email: email
  telephone: string
  dateOfBirth: Date
  genre: UserGenre
}

export interface Login {
  email: email
  password: string
}

export interface AuthenticatedUser {
  token: string
  user: UserDto
}

export interface PasswordsType {
  currentPassword: string
  newPassword: string
}

export type UserRepository = Repository<User>

import { type Repository } from 'typeorm'
import { MESSAGES } from '../constants/msgs'
import { type User } from '../entities'
import { type email } from './global.types'

export enum UserRole {
  admin = MESSAGES.ADMIN,
  patient = MESSAGES.PATIENT,
  doctor = MESSAGES.DOCTOR
}

export enum UserStatus {
  enable = MESSAGES.ENABLE,
  disable = MESSAGES.DISABLE,
  pending = MESSAGES.PENDING
}

export enum UserGenre {
  male = MESSAGES.MALE,
  female = MESSAGES.FEMALE
}

export interface UserDto {
  id?: number
  firstName: string
  lastName: string
  email: email
  telephone: string
  dateOfBirth: Date
  genre: UserGenre
  role: string
  doctorId?: number
  patientId?: number
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

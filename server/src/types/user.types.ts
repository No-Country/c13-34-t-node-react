import { type Repository } from 'typeorm'
import { type User } from '../entities'

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

export type UserRepository = Repository<User>

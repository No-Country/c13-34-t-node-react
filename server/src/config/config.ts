import 'dotenv/config'
import {
  Doctor,
  MedicalAppointment,
  MedicalRecord,
  Patient,
  PatientMedicalHistory,
  User
} from '../entities'

const ENV = process.env

export const mode = ENV.NODE_ENV
export const port = ENV.PORT || 4444
export const salt = Number(ENV.SALT)

export const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET || 'alguntokensecreto'
}

export const dbConfig = Object.freeze({
  type: ENV.DB_TYPE as any,
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  logging: true,
  synchronize: true,
  entities: [
    User,
    Patient,
    Doctor,
    MedicalAppointment,
    MedicalRecord,
    PatientMedicalHistory
  ]
})

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
export const port = ENV.PORT ?? 4444
export const salt = Number(ENV.SALT)

export const modes = Object.freeze({
  dev: 'development',
  prod: 'production'
})
export const jwtConfig = {
  secret: ENV.JWT_SECRET ?? 'alguntokensecreto',
  expiresIn: ENV.JWT_EXPIRES_IN ?? '2h'
}
export const dbConfig = Object.freeze({
  type: ENV.DB_TYPE as any,
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  logging: false,
  synchronize: true,
  ssl: {
    ca: ENV.SSL_CERT,
    rejectUnauthorized: false
  },
  entities: [
    User,
    Patient,
    Doctor,
    MedicalAppointment,
    MedicalRecord,
    PatientMedicalHistory
  ]
})
export const ACCEPTED_ORIGIN = 'http://localhost:3000'

import { config } from 'dotenv'

config()

const ENV = process.env

export const port = Number(ENV.PORT)

export default{
  jwtSecret: process.env.JWT_SECRET || 'alguntokensecreto'
}

export const dbConfig = {
  type: ENV.DB_TYPE as any,
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  logging: true,
  synchronize: true,
  entities: []
}

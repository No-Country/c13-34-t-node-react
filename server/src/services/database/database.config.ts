import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { dbConfig } from '../../config/config'

export const AppDataSrc = new DataSource(dbConfig)

// {
//   type: 'postgres' as any,
//   host: 'localhost',
//   port: 5437,
//   username: 'postgres',
//   password: 'postgres123',
//   database: 'nocountrypj1',
//   logging: true,
//   synchronize: true,
//   entities: ['./src/entities/*.js']
// }

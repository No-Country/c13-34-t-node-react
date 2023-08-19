import express, { type Express } from 'express'
import { port } from './config/config'
import { AppDataSrc } from './services/database/database.config'

export const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dbStartUp = async () => {
  try {
    await AppDataSrc.initialize()
  } catch (error) {
    console.log('❌ Error', error)
  }
}

dbStartUp().then(() => console.log('All good'))

app.listen(port, () => console.log('Server connected on port', port))

import express, { type Express } from 'express'
import { port } from './config/config'
import { AppDataSrc } from './services/database/database.config'
import { router } from './routes/index'

export const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

const dbStartUp = async () => {
  try {
    await AppDataSrc.initialize()
  } catch (error) {
    console.log('❌ Error', error)
  }
}

dbStartUp().then(() => console.log('All good'))

const server = app.listen(port, () =>
  console.log('Server connected on port', port)
)
server.on('error', (e) => console.error(`Server error: ${e}`))

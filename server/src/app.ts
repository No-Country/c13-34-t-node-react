import cors from 'cors'
import express, { type Express } from 'express'
import { globalErrorHandler } from './middlewares/error.middleware'
import { router } from './routes/index'

export const app: Express = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

app.use(globalErrorHandler)

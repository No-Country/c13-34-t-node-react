import express, { type Express } from 'express'
import { router } from './routes/index'
import { globalErrorHandler } from './middlewares/error.middleware'

export const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

app.use(globalErrorHandler)

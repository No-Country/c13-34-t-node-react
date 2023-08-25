import express, { type Express } from 'express'
import cors from 'cors'
import { globalErrorHandler } from './middlewares/error.middleware'
import { router } from './routes/index'
import { ACCEPTED_ORIGIN } from './config/config'

export const app: Express = express()

app.use(cors({ credentials: true, origin: ACCEPTED_ORIGIN, methods: ['POST'] }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router)

app.use(globalErrorHandler)

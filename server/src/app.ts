import express from 'express'
import { initializate } from './server'

//initializations
const app = express()

await initializate(app)


//settings


//middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//routes



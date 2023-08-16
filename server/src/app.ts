import express from 'express'
import { initializate } from './server'

const app = express()

await initializate(app)

import express from 'express'
import { initializate } from './server'


import   authRoutes from './routes/auth.routes'
//initializations
const app = express()

await initializate(app)


//settings


//middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routes
app.get('/', (req, res)=>{
    res.send(`La API esta en http://localhost:${app.get('port')}`)
})

app.use(authRoutes)
export default app
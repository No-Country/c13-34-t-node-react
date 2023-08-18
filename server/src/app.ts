import express from 'express'
import { authRoutes } from './routes/auth.routes.js'
//initializations
export const app = express();

//settings


//middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routes
app.get('/', (req, res)=>{
    res.send(`La API esta en http://localhost:${app.get('port')}`)
})

app.use(authRoutes)
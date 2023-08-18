import { app } from "./app.js";
import { port } from './config/config.js'
import { AppDataSrc } from './services/database/database.config.js'
 
try {
  await AppDataSrc.initialize()
} catch (e) {
  throw new Error('Ocurrio Un Error Con La Base De Datos.')
}

console.log('Base De Datos Inicializada 🔥')

app.listen(port, () =>
  console.log(`Servidor Conectado En El Puerto : ${port}`)
)
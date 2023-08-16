import { type Express } from 'express'
import { port } from './config/config'
import { AppDataSrc } from './services/database/database.config'

export const initializate = async (app: Express) => {
  try {
    await AppDataSrc.initialize()
  } catch (e) {
    throw new Error('Ocurrio Un Error Con La Base De Datos.')
  }

  console.log('Base De Datos Inicializada 🔥')

  app.listen(port, () =>
    console.log(`Servidor Conectado En El Puerto : ${port}`)
  )
}

import { app } from './app'
import { port } from './config/config'
import { AppDataSrc } from './services/database/database.config'

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

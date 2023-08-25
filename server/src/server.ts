import { app } from './app'
import { port } from './config/config'
import { ERROR_MSGS } from './constants/errorMsgs'
import { MESSAGES } from './constants/msgs'
import { AppDataSrc } from './services/database/database.config'

const dbStartUp = async () => {
  try {
    await AppDataSrc.initialize()
  } catch (error) {
    console.log(ERROR_MSGS.ERROR, error)
  }
}

void dbStartUp().then(() => {
  console.log(MESSAGES.DB_START_UP_OK)
})

const server = app.listen(port, () => {
  console.log(MESSAGES.SERVER_CONNECTED_ON_PORT, port)
})
server.on(ERROR_MSGS.ERROR, (e) => {
  console.error(ERROR_MSGS.SERVER_ERROR, e)
})

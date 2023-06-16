import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connected!')
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error(err)
  }
}

main()

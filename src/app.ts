import cors from 'cors'
import express, { Application } from 'express'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1/users/', UserRoutes)
// Testing

app.use(globalErrorHandler)

export default app

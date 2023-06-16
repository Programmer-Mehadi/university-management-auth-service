import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import handleZodError from '../../errors/handleZodError'
import { IGenericErrorMessage } from '../../interfaces/error'
import { errorlogger } from '../../shared/logger'
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const serverFormat = config?.env
  if (serverFormat === 'development') {
    console.log('globalErrorHandler ~ ', error)
  } else {
    errorlogger.error('globalErrorHandler ~ ', error)
  }
  let statusCode = 500
  let message = 'Somehting went wrong !'
  let errorMessages: IGenericErrorMessage[] = []
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMeaasge
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMeaasge
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  // response
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler

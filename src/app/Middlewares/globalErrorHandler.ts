import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../Errors/HandleValidationerror'
import ApiError from '../../Errors/ApiError'
import { errorlogger } from '../../shared/logger'

// global error handeler
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('globalErrorHandler', error)
    : errorlogger.error('globalErrorHandler', error)

  let statusCode = 500
  let message = 'Something Went Wrogn'
  let errorMessages: IGenericErrorMessage[] = []

  if (error.name === 'ValidationError') {
    const simplicfiedError = handleValidationError(error)
    statusCode = simplicfiedError.statusCode
    message = simplicfiedError.message
    errorMessages = simplicfiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
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

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler

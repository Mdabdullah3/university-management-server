import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/users/user.routes'

const app: Application = express()

app.use(cors())

class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Apllication Route

app.use('/api/v1/users', router)

//Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // next('onk error')
  throw new Error('new error')
})

// global error handeler

app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err })
  } else {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default app

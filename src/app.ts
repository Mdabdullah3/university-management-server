import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import globalErrorHandler from './app/Middlewares/globalErrorHandler'
import router from './app/routes'
import httpStatus from 'http-status'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', router)

//Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

// Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    messsage: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  })
  next()
})

// const testId = async () => {
//   const testId = await generateFacultyId()
//   console.log(testId)
// }

// testId()
//global error handler
app.use(globalErrorHandler)

export default app

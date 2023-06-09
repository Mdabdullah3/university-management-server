import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/Middlewares/globalErrorHandler'
import router from './app/routes'

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

//global error handler
app.use(globalErrorHandler)

export default app

import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/Middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.routes'
// import ApiError from './Errors/ApiError'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', UserRoutes)

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

//global error handler
app.use(globalErrorHandler)

export default app

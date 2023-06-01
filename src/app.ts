import express, { Application } from 'express'
import cors from 'cors'
import router from './app/modules/users/user.routes'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Apllication Route

app.use('/api/v1/users/', router)

export default app

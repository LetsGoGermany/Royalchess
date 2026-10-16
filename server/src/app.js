import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({
    origin: "http://192.168.2.115:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

import authRouter from './routes/auth.routes.js'
import gameRouter from './routes/game.routes.js'
import errorHandling from './middleware/error.middleware.js'

app.use('/auth', authRouter)
app.use('/game', gameRouter)
app.use(errorHandling)

export default app
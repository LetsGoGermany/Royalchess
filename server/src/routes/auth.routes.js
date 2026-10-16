import express from 'express'
import { isLoggedIn, login, register } from '../controller/auth.controller.js'
import { verifyAuthToken } from '../middleware/auth.middleware.js'

const authRouter = express.Router()


authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.get('/',verifyAuthToken,isLoggedIn)

export default authRouter

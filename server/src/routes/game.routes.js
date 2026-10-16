import express from 'express'
import { verifyAuthToken } from '../middleware/auth.middleware.js'
import { getBoard } from '../controller/game.controller.js'

const gameRouter = express.Router()

gameRouter.get('/getBoard',verifyAuthToken,getBoard)
export default gameRouter
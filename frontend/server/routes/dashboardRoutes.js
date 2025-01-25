import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { getSummary } from '../controllers/dashboardController.js'



const router = express.Router()

router.get('/summary', authMiddlerware, getSummary)

export default router
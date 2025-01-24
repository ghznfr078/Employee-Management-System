import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addLeave } from '../controllers/leaveController.js'


const router = express.Router()

router.post('/add', authMiddlerware, addLeave)

export default router
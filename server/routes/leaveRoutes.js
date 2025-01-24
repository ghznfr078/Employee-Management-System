import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addLeave, getLeaves } from '../controllers/leaveController.js'


const router = express.Router()

router.post('/add', authMiddlerware, addLeave)
router.get('/:id', authMiddlerware, getLeaves)

export default router
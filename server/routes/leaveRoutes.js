import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave } from '../controllers/leaveController.js'


const router = express.Router()

router.post('/add', authMiddlerware, addLeave)
router.get('/:id', authMiddlerware, getLeave)
router.get('/', authMiddlerware, getLeaves)
router.get('/detail/:id', authMiddlerware, getLeaveDetail)
router.put('/:id', authMiddlerware, updateLeave)

export default router
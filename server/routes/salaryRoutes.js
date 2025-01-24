import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addSalary } from '../controllers/salaryController.js'


const router = express.Router()

router.post('/add', authMiddlerware, addSalary)

export default router
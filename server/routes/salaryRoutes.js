import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addSalary, getSalary } from '../controllers/salaryController.js'


const router = express.Router()

router.post('/add', authMiddlerware, addSalary)
router.get('/:id', authMiddlerware, getSalary)

export default router
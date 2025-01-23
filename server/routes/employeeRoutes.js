import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addEmployee, upload, getEmployees } from '../controllers/employeeController.js'

const router = express.Router()


router.post('/add', authMiddlerware, upload.single('image'), addEmployee)
router.get('/', authMiddlerware, getEmployees)

export default router
import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee } from '../controllers/employeeController.js'

const router = express.Router()


router.post('/add', authMiddlerware, upload.single('image'), addEmployee)
router.get('/', authMiddlerware, getEmployees)
router.get('/:id', authMiddlerware, getEmployee)
router.put('/:id', authMiddlerware, updateEmployee)

export default router
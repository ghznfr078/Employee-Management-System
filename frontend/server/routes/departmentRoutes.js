import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from '../controllers/departController.js'

const router = express.Router()


router.get('/', authMiddlerware, getDepartments)
router.post('/add', authMiddlerware, addDepartment)
router.get('/:id', authMiddlerware, getDepartment)
router.put('/:id', authMiddlerware, updateDepartment)
router.delete('/:id', authMiddlerware, deleteDepartment)

export default router
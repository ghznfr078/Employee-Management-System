import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addDepartment, getDepartments } from '../controllers/departController.js'

const router = express.Router()


router.get('/', authMiddlerware, getDepartments)
router.post('/add', authMiddlerware, addDepartment)

export default router
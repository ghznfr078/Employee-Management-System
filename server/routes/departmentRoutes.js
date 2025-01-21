import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { addDepartment } from '../controllers/departController.js'

const router = express.Router()

router.post('/add', authMiddlerware, addDepartment)

export default router
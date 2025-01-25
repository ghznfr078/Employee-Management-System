import express from 'express'
import { login, verify } from '../controllers/authController.js'
import authMiddlerware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', login)
router.get('/verify', authMiddlerware, verify)

export default router
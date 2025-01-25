import express from 'express'

import authMiddlerware from '../middlewares/authMiddleware.js'
import { changePassword } from '../controllers/settingController.js'



const router = express.Router()

router.put('/change-password', authMiddlerware, changePassword)


export default router
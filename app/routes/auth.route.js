import { Router } from 'express'
import authController from '../controllers/auth.controller.js'
import authMiddleware from '../midleware/auth.midleware.js'
const router = Router()

router.use(authMiddleware.checkAccDataIsValid)
router.post('/register', authController.register)
router.post('/login', authController.login)

export default router
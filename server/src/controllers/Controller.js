import express from 'express'

// internal routes
import UserController from './UserController.js'
import RoleController from './RoleController.js'
import AuthController from './AuthController.js'

const router = express.Router()

router.use('/user', UserController)
router.use('/role', RoleController)
router.use('/auth', AuthController)

export default router

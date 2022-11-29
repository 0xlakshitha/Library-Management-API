import { Router } from 'express'

import { adminLogin, userRegister, userLogin } from '../controllers/auth.js'

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../middleware/verifyToken.js'

const router = Router()

router.post('/admin/login', adminLogin)

router.post('/user/register', userRegister)

router.post('/user/login', userLogin)

export default router
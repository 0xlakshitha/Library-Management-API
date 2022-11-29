import { Router } from 'express'

import { getMe, getAll, updateUser, deleteUser } from '../controllers/user.js'

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../middleware/verifyToken.js'

const router = Router()

router.get('/me/:id', verifyTokenAndAuthorization, getMe)

router.get('/', verifyTokenAndAdmin, getAll)

router.put('/:id', verifyTokenAndAuthorization, updateUser)

router.delete('/:id', verifyTokenAndAuthorization, deleteUser)

export default router
import { Router } from 'express'

import { createAdmin, getMe, getAll, updateAdmin, deleteAdmin } from '../controllers/admin.js'

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../middleware/verifyToken.js'

const router = Router()

router.post('/create', verifyTokenAndAdmin, createAdmin)

router.get('/me/:id', verifyTokenAndAuthorization, getMe)

router.get('/', verifyTokenAndAdmin, getAll)

router.put('/:id', verifyTokenAndAuthorization, updateAdmin)

router.delete('/:id', verifyTokenAndAuthorization, deleteAdmin)

export default router
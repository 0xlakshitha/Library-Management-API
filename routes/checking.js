import { Router } from 'express'

import { createChecking, getChecking, getMyChekings, getAll, updateCheking, deleteCheking } from '../controllers/checking.js'

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../middleware/verifyToken.js'

const router = Router()

router.post('/create', verifyToken, createChecking)

router.get('/:id', verifyToken, getChecking)

router.get('/', verifyTokenAndAdmin, getAll)

router.get('/my/checkings', verifyToken, getMyChekings)

router.put('/:id', verifyTokenAndAdmin, updateCheking)

router.delete('/:id', verifyTokenAndAdmin, deleteCheking)

export default router
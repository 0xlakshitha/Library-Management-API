import { Router } from 'express'

import { createPayment, getPayment, getMyPayments, getAll, updatePayment, deletePayment } from '../controllers/payment.js'

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../middleware/verifyToken.js'

const router = Router()

router.post('/create', verifyToken, createPayment)

router.get('/:id', verifyToken, getPayment)

router.get('/', verifyTokenAndAdmin, getAll)

router.get('/my/payments', verifyToken, getMyPayments)

router.put('/:id', verifyTokenAndAdmin, updatePayment)

router.delete('/:id', verifyTokenAndAdmin, deletePayment)

export default router
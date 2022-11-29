import { Router } from 'express'

import { createPublisher, getPublisher, getAll, updatePublisher, deletePublisher, searchPublisher } from '../controllers/publisher.js'

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../middleware/verifyToken.js'

const router = Router()

router.post('/create', verifyTokenAndAdmin, createPublisher)

router.get('/:id', getPublisher)

router.get('/', getAll)

router.put('/:id', verifyTokenAndAdmin, updatePublisher)

router.delete('/:id', verifyTokenAndAdmin, deletePublisher)

router.post('/search', searchPublisher)

export default router
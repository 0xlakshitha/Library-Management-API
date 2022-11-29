import { Router } from 'express'

import { createAuthor, getAuthor, getAll, updateAuthor, deleteAuthor, searchAuthor } from '../controllers/author.js'

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../middleware/verifyToken.js'

const router = Router()

router.post('/create', verifyTokenAndAdmin, createAuthor)

router.get('/:id', getAuthor)

router.get('/', getAll)

router.put('/:id', verifyTokenAndAdmin, updateAuthor)

router.delete('/:id', verifyTokenAndAdmin, deleteAuthor)

router.post('/search', searchAuthor)

export default router
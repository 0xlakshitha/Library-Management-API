import { Router } from 'express'

import { createBook, getBook, getBookByAuthor, getBookByPublisher, getAll, updateBook, deleteBook, searchBook } from '../controllers/book.js'

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} from '../middleware/verifyToken.js'

const router = Router()

router.post('/create', verifyTokenAndAdmin, createBook)

router.get('/:id', getBook)

router.get('/author/:id', getBookByAuthor)

router.get('/publisher/:id', getBookByPublisher)

router.get('/', getAll)

router.put('/:id', verifyTokenAndAdmin, updateBook)

router.delete('/:id', verifyTokenAndAdmin, deleteBook)

router.post('/search', searchBook)

export default router
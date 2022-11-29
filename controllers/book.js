import Book from '../models/book.js'

export const createBook = async (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        categories: req.body.categories,
        author: req.body.author,
        publisher: req.body.publisher,
        thumbnail: req.body.thumbnail,
        isbn: req.body.isbn,
        published_date: req.body.published_date,
        pages: req.body.pages
    })

    try {

        const book = await newBook.save()

        res.status(201).json(book)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getBook = async (req, res) => {
    try {

        const book = await Book.findById(req.params.id)
                .populate('author', 'name')
                .populate('publisher', 'name')

        if(!book) return res.status(404).json({message: `cannot find any book with ${req.params.id}`})

        res.status(200).json(book)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getBookByAuthor = async (req, res) => {
    try {

        const books = await Book.find({
            author: req.params.id
        })
        .populate('author', 'name')
        .populate('publisher', 'name')

        res.status(200).json(books)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getBookByPublisher = async (req, res) => {
    try {

        const books = await Book.find({
            publisher: req.params.id
        })
        .populate('author', 'name')
        .populate('publisher', 'name')

        res.status(200).json(books)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getAll = async (req, res) => {

    const category = req.query.category

    try {

        let books

        if(category) {
            books = await Book.find({categories : {
                $in : [category]
            }})
                .populate('author', 'name')
                .populate('publisher', 'name')
        }
        else {
            books = await Book.find()
                .populate('author', 'name')
                .populate('publisher', 'name')
        }

        res.status(200).json(books)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const updateBook = async (req, res) => {

    try {

        const bookExist = await Book.findById(req.params.id)

        if(!bookExist) {
            return res.status(404).json({msg: `No book with ${req.params.id}`})
        }

        const book = await Book.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        })

        res.status(200).json(book)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if(!book) {
            return res.status(404).json({msg: `No book with ${req.params.id}`})
        }

        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Successfully delete book'})
    } catch(error) {
        res.status(500).json(error)
    }
}


export const searchBook = async (req, res) => {
    const query = req.body.query
    const category = req.body.category

    try {

        let books

        if(category) {
            books = await Book.find({
                $and: [
                    {title: { $regex : `${query}`, $options : 'i'}},
                    {categories : { $in : [category] }}
                ]
            })
            .populate('author', 'name')
            .populate('publisher', 'name')
        }
        else {
            books = await Book.find({
            
                title: { $regex : `${query}`, $options : 'i'}
                
            })
            .populate('author', 'name')
            .populate('publisher', 'name')
        }
        
        res.status(200).json(books)

    } catch (error) {
        res.status(500).json(error.message)
    }
}
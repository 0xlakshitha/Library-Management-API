import Author from '../models/author.js'

export const createAuthor = async (req, res) => {
    const newAuthor = new Author({
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address,
        email: req.body.email,
        mobile: req.body.mobile
    })

    try {

        const author = await newAuthor.save()

        res.status(201).json(author)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getAuthor = async (req, res) => {
    try {

        const author = await Author.findById(req.params.id)

        if(!author) return res.status(404).json({message: `cannot find any author with ${req.params.id}`})

        res.status(200).json(author)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



export const getAll = async (req, res) => {
    try {

        let authors = await Author.find()

        res.status(200).json(authors)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const updateAuthor = async (req, res) => {

    try {

        const authorExist = await Author.findById(req.params.id)

        if(!authorExist) {
            return res.status(404).json({msg: `No author with ${req.params.id}`})
        }

        const author = await Author.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        })

        res.status(200).json(author)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)

        if(!author) {
            return res.status(404).json({msg: `No author with ${req.params.id}`})
        }

        await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Successfully delete author'})
    } catch(error) {
        res.status(500).json(error)
    }
}


export const searchAuthor = async (req, res) => {
    const query = req.body.query

    try {

        const authors = await Author.find({
            
            name: { $regex : `${query}`, $options : 'i'}
            
        })
        
        res.status(200).json(authors)

    } catch (error) {
        res.status(500).json(error.message)
    }
}
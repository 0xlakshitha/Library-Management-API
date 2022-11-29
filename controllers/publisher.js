import Publisher from '../models/publisher.js'

export const createPublisher = async (req, res) => {
    const newPublisher = new Publisher({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        mobile: req.body.mobile
    })

    try {

        const publisher = await newPublisher.save()

        res.status(201).json(publisher)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getPublisher = async (req, res) => {
    try {

        const publisher = await Publisher.findById(req.params.id)

        if(!publisher) return res.status(404).json({message: `cannot find any publisher with ${req.params.id}`})

        res.status(200).json(publisher)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



export const getAll = async (req, res) => {
    try {

        let publishers = await Publisher.find()

        res.status(200).json(publishers)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const updatePublisher = async (req, res) => {

    try {

        const publisherExist = await Publisher.findById(req.params.id)

        if(!publisherExist) {
            return res.status(404).json({msg: `No publisher with ${req.params.id}`})
        }

        const publisher = await Publisher.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        })

        res.status(200).json(publisher)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deletePublisher = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.params.id)

        if(!publisher) {
            return res.status(404).json({msg: `No publisher with ${req.params.id}`})
        }

        await Publisher.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Successfully delete publisher'})
    } catch(error) {
        res.status(500).json(error)
    }
}


export const searchPublisher = async (req, res) => {
    const query = req.body.query

    try {

        const publisher = await Publisher.find({
            
            name: { $regex : `${query}`, $options : 'i'}
            
        })
        
        res.status(200).json(publisher)

    } catch (error) {
        res.status(500).json(error.message)
    }
}
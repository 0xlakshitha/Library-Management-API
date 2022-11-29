import Checking from '../models/checkinout.js'

export const createChecking = async (req, res) => {

    if(!req.user) return res.status(403).json({message: "Please login"})

    const newChecking = new Checking({
        user: req.user.id,
        due_date: req.body.due_date,
        due_time: req.body.due_time
    })

    try {

        const checking = await newChecking.save()

        res.status(201).json(checking)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getChecking = async (req, res) => {
    try {

        const checking = await Checking.findById(req.params.id)

        if(!checking) return res.status(404).json({message: `cannot find any checking with ${req.params.id}`})

        if(req.user.id != checking.user ) {
            if(!req.user.isAdmin) return res.status(403).json({message: 'You are not allowed'})
        }

        res.status(200).json(checking)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getAll = async (req, res) => {
    try {

        let checkings = await Checking.find()

        res.status(200).json(checkings)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getMyChekings = async (req, res) => {

    if(!req.user) return res.status(403).json({message: "Please login"})

    try {

        let checkings = await Checking.find({
            user: req.user.id
        })

        res.status(200).json(checkings)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const updateCheking = async (req, res) => {

    try {

        const checkingExist = await Checking.findById(req.params.id)

        if(!checkingExist) {
            return res.status(404).json({msg: `No checking record with ${req.params.id}`})
        }

        const checking = await Checking.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        })

        res.status(200).json(checking)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteCheking = async (req, res) => {
    try {
        const checking = await Checking.findById(req.params.id)

        if(!checking) {
            return res.status(404).json({msg: `No checking record with ${req.params.id}`})
        }

        await Checking.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Successfully delete checking'})
    } catch(error) {
        res.status(500).json(error)
    }
}

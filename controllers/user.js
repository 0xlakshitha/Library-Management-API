import User from '../models/user.js'
import CryptoJs from 'crypto-js'

export const getMe = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)

        if(!user) return res.status(404).json({message: `cannot find any user with ${req.params.id}`})

        const { password, ...payload } = user._doc

        res.status(200).json({
            ...payload
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



export const getAll = async (req, res) => {
    try {

        let users = await User.find().sort({_id: -1})

        if(users.length > 0) {
            users = users.map(user => {
                const { password, ...payload } = user._doc

                return { ...payload }
            })
        }

        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const updateUser = async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString()
    }

    try {

        const userExist = await User.findById(req.params.id)

        if(!userExist) {
            return res.status(404).json({msg: `No user with ${req.params.id}`})
        }

        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user) {
            return res.status(404).json({msg: `No user with ${req.params.id}`})
        }

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Successfully delete user'})
    } catch(error) {
        res.status(500).json(error)
    }
}
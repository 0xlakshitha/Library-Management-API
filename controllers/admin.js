import Admin from '../models/admin.js'
import CryptoJs from 'crypto-js'

export const createAdmin = async (req, res) => {
    const newAdmin = new Admin({
        name: req.body.name,
        username: req.body.username,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET),
        email: req.body.email,
        mobile: req.body.mobile
    })

    try {
        
        const adminExist = await Admin.findOne({
            username: req.body.username
        })

        if(adminExist) return res.status(403).json({message: 'User name already exist'})

        const emailExist = await Admin.findOne({
            email: req.body.email
        })

        if(emailExist) return res.status(403).json({message: `${req.body.email} already have an account`})

        const admin = await newAdmin.save()


        const { password, ...data } = admin._doc

        res.status(201).json({
            ...data
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const getMe = async (req, res) => {
    try {

        const admin = await Admin.findById(req.params.id)

        if(!admin) return res.status(404).json({message: `cannot find any admin with ${req.params.id}`})

        const { password, ...payload } = admin._doc

        res.status(200).json({
            ...payload
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



export const getAll = async (req, res) => {
    try {

        let admins = await Admin.find()

        if(admins.length > 0) {
            admins = admins.map(admin => {
                const { password, ...payload } = admin._doc

                return { ...payload }
            })
        }

        res.status(200).json(admins)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const updateAdmin = async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString()
    }


    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        })

        res.status(200).json(admin)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id)

        if(!admin) {
            return res.status(404).json({msg: `No admin with ${req.params.id}`})
        }

        await Admin.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Successfully delete admin'})
    } catch(error) {
        res.status(500).json(error)
    }
}
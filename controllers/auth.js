import CryptoJs from 'crypto-js'
import Admin from '../models/admin.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'


export const userRegister = async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET),
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address
    })

    try {
        
        const userExist = await User.findOne({
            username: req.body.username
        })

        if(userExist) return res.status(403).json({message: 'User name already exist'})

        const emailExist = await User.findOne({
            email: req.body.email
        })

        if(emailExist) return res.status(403).json({message: `${req.body.email} already have an account`})

        const user = await newUser.save()

        const accessToken = jwt.sign({
            sub: user._id,
            role: 'user'
        }, process.env.JWT_SECRET,
        { expiresIn: '3d' })

        const { password, ...data } = user._doc

        res.status(201).json({
            ...data,
            accessToken
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})

        if(!user) return res.status(404).json({message: `No user with ${req.body.username}`})

        const passwordHash = CryptoJs.AES.decrypt(
            user.password, 
            process.env.PASSWORD_SECRET).toString(CryptoJs.enc.Utf8)

        if(passwordHash !== req.body.password) {
            return res.status(401).json({message: 'Incorrect Password'})
        }

        const accessToken = jwt.sign({
            sub: user._id,
            role: 'user'
        }, process.env.JWT_SECRET,
        { expiresIn: '3d' })


        res.status(200).json({ accessToken });

    } catch (error) {
        res.status(500).json({error});
    }
}

export const adminLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({username: req.body.username})

        if(!admin) return res.status(404).json({message: `No admin with ${req.body.username}`})

        const passwordHash = CryptoJs.AES.decrypt(
            admin.password, 
            process.env.PASSWORD_SECRET).toString(CryptoJs.enc.Utf8)

        if(passwordHash !== req.body.password) {
            return res.status(401).json({message: 'Incorrect Password'})
        }

        const accessToken = jwt.sign({
            sub: admin._id,
            role: 'admin'
        }, process.env.JWT_SECRET,
        { expiresIn: '3d' })


        res.status(200).json({ accessToken });

    } catch (error) {
        res.status(500).json({error: error});
    }
}


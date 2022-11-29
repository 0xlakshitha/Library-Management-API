import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'
import User from '../models/user.js'

const getUser = async (payload) => {

    try {
        let user
        if(payload.role === 'admin') {
            // user = await Admin.findById(payload.sub)
            // if(user) {
            //     const { password, ...data } = user._doc
            // }
            user = {
                id: payload.sub,
                isAdmin: true
            }
        }
        else {
            user = await User.findById(payload.sub)
            // const { password, ...data } = user._doc
            user = {
                id: payload.sub,
                isAdmin: false
            }
        }

        return user

    } catch (error) {
        throw error
    }
}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    if(!authHeader) {
        return res.status(401).send('You are not authenticated!')
    } 

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if(err) {
            return res.status(403).send('Token is not valid!')
        }

        req.user = await getUser(payload)
        next()
    })
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else {
            return res.status(403).send('You are not allowed')
        }
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        }
        else {
            return res.status(403).send('You are not allowed')
        }
    })
}

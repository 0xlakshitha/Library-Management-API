import Admin from '../models/admin.js'
import CryptoJs from 'crypto-js'

const createSuperAdmin = async () => {
    const superAdmin = new Admin({
        username: process.env.SUPER_ADMIN_USERNAME,
        password: CryptoJs.AES.encrypt(process.env.SUPER_ADMIN_PASSWORD, process.env.PASSWORD_SECRET)
    })

    try {
        await Admin.findOneAndDelete({
            username: process.env.SUPER_ADMIN_USERNAME
        })

        await superAdmin.save()
        console.log('Super Admin Created')
    } catch (error) {
        throw error
    }
}

export default createSuperAdmin
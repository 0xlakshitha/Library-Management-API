import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password :  {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
    }
    
}, {timestamps: true})

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin
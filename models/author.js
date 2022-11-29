import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
    },
    address: {
        type: Object,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String
    }
}, {timestamps: true})

const Author = mongoose.model("Author", AuthorSchema);

export default Author
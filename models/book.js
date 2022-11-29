import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher'
    },
    thumbnail: {
        type: String,
    },
    isbn: {
        type: String,
        required: true
    },
    published_date: {
        type: Date
    },
    pages: {
        type: Number
    },
    read_count: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }
    
}, {timestamps: true})

const Book = mongoose.model("Book", BookSchema);

export default Book
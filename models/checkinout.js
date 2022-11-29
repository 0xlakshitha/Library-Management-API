import mongoose from "mongoose";

const CheckingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chcking_date: {
        type: Date,
        default: Date.now
    },
    checkout_date: {
        type: Date
    },
    due_date: {
        type: String
    },
    due_time: {
        type: String
    }
}, {timestamps: true})

const Checking = mongoose.model("Checking", CheckingSchema);

export default Checking
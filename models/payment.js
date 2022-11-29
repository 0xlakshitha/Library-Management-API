import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
    }
}, {timestamps: true})

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment
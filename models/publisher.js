import mongoose from "mongoose";

const PublisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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

const Publisher = mongoose.model("Publisher", PublisherSchema);

export default Publisher
import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        id: {type: String},
        page: {type: String, required: true},
        text: {type: String, required: true}
    }
)
const socketDocs = mongoose.model('socket-docs', schema)
export default socketDocs
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


const TodoSchema = mongoose.Schema({
    text: {
        type: String
    },
    description:{
        type: String
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "jwt"
    }
})

const todoModel = mongoose.model("todo", TodoSchema)
const userModel = mongoose.model("jwt", userSchema)
export { todoModel, userModel };
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    }
})

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
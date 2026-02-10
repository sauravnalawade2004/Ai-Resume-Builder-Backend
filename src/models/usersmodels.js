import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

export const userModel = mongoose.model("user", UserSchema)
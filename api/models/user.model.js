import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        unique: true,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    }

}, {timestamps: true});


const User = mongoose.Model('User', userSchema);

export default User;
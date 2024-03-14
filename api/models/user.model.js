import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    username:{
        type: String,
        unique: true,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        
    },
    password:{
        type: String,
        required: true,
        
    },
    profilePicture: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&usqp=CAU',
    }

}, {timestamps: true});


const User = mongoose.model('User', userSchema);

export default User;
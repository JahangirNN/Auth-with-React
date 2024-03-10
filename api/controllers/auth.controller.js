import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup =  async (req, res, next) => {
    const {username, email, password} = req.body
    try{
    if(!email || !password || !username) throw (errorHandler('401', 'Credentials required'));
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password:hashPassword});   
    await newUser.save();
    res.status(201).json({message:'User Created Successfully'});
    }
    catch(err){
        next(errorHandler(err.status, err.message));
    }
}; 

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        if(!email || !password) throw (errorHandler('404', 'Credentials required'));
        const validUser = await User.findOne({email:email});
        if(!validUser) throw (errorHandler('404', 'User not found'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        
        if(validPassword === false) {
            throw errorHandler('401', 'Invalid credentials');
        
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password: hashPassword , ...rest} = validUser._doc;
        const expiryDate = new Date(Date.now()+3600000); 
        res
        .cookie('access_token', token, 
            {httpOnly: true, expires: expiryDate})
        .status(200)
        .json(rest);
        
        
    }
    catch(err){
        next(err);
    }
};

import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected To MongoDB");
}).catch((err)=>{
    console.log(err);
});
 
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log('Listening on Port 3000');
});

app.get('/', (req, res)=> {
    res.json({
        message:'Hello Its Get Response'
    });
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next)=> {
    const statusCode = err.statusCode || 500;
    const message = err.message || json({message:'Internal Server Error'});
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})
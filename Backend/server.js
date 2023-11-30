import Express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./Middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port=process.env.PORT || 3000;
import userRoutes from './Routes/userRoutes.js'
import adminRoutes from'./Routes/adminRoutes.js'
connectDB();
const app=Express();

app.use(Express.json())
app.use(Express.urlencoded({extended:true}));

app.use(cookieParser())
app.use(Express.static('backend/Public'));

app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)

app.get('/',(req,res)=>{res.send('sever is ready')})

app.use(notFound);
app.use(errorHandler)
app.listen(port,()=>{ console.log(`Server is Running: http://localhost:${port}`)})
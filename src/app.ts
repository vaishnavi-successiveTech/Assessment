import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import { router } from "./router/authRouter";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();
const app=express();
const PORT=process.env.PORT ||  8008;
app.use(express.json());

app.use(cookieParser())
app.use("/api",router);

app.use((req:Request,res:Response)=>{
   res.status(404).json({
      success:false,
      message:"Page not found"
   })
})
app.use(errorHandler);
connectDb();
app.listen(PORT,()=>{
   console.log(`serve  http://localhost/${PORT}`)
})
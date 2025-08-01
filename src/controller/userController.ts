import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { UserPerson } from "../models/UserPerson";

export const userController=async (req:Request,res:Response,next:NextFunction)=>{
    const {email,userName}=req.body;
    const existingUser= await UserPerson.findOne({email});
    if(existingUser){
        return res.status(404).json({
            success:false,
            message:"User already exist",
        })
    }
    const newUser= new UserPerson({email,userName});
    await newUser.save();

    return res.status(201).json({
        success:true,
        message:"New user craeted",
        data:{
           email: newUser.email,
           username:newUser.userName

        }
    })

}
export const loginController=async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password}=req.body;
    const existingUser= await UserPerson.findOne({email});
    if(!existingUser){
        return res.status(404).json({
            success:false,
            message:"User does not exist.Please signup",
        })
    }
    const token =jwt.sign({email:existingUser.email,id:existingUser._id},process.env.JWT_SECRET!,{expiresIn:"2h"});
    
    return res.cookie("token",token,{
        httpOnly:true,
        sameSite:true,
        "maxAge":60*60*100
   } ).status(201).json({
        success:true,
        message:"New user craeted",
        data:{
           email:existingUser.email,
           token,
           name:existingUser.userName
        }

    })

}

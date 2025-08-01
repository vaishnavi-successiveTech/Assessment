import { NextFunction, Request, Response } from "express";
import { Student } from "../models/Student";
import jwt from "jsonwebtoken";

export const studentControllers=async (req:Request,res:Response,next:NextFunction)=>{
    const {email,grade,name,age}=req.body;
    const existingUser= await Student.findOne({email});
    if(existingUser){
        return res.status(404).json({
            success:false,
            message:"User already exist",
        })
    }
    const newUser= new Student({email,grade,name,age});
    await newUser.save();

    return res.status(201).json({
        success:true,
        message:"New user craeted",
        data:{
           email: newUser.email,
           grade:newUser.grade,
           name:newUser.name,
           age:newUser.age
        }
    })

}

export const studentId=async (req:Request,res:Response,next:NextFunction)=>{
    const {_id}=req.params;
    const newData= await Student.findById(_id);
    if(!newData){
        return res.status(400).json({
            success:false,
            message:"user does note exist"
        })
    }
    res.status(200).json({
        success:true,
        message:"Data is here",
        data:{id:newData._id, email:newData.email}
        


    })
}

export const studentg=async (req:Request,res:Response,next:NextFunction)=>{
    const {email}=req.params;
    const newData= await Student.deleteOne({email});
    if(!newData){
        return res.status(400).json({
            success:false,
            message:"user does note exist"
        })
    }
    res.status(200).json({
        success:true,
        message:"Data is here",
      
        


    })
}

export const studentGet=async (req:Request,res:Response,next:NextFunction)=>{
    
    const newData= await Student.find();
    if(!newData){
        return res.status(400).json({
            success:false,
            message:"user does note exist"
        })
    }
    res.status(200).json({
        success:true,
        message:"Data is here",
      
        


    })
}
// export const studentLoginController=async (req:Request,res:Response,next:NextFunction)=>{
//     const {email}=req.body;
//     const existingUser= await Student.findOne({email});
//     if(!existingUser){
//         return res.status(404).json({
//             success:false,
//             message:"User does not exist.Please signup",
//         })
//     }
//     const token =jwt.sign({email:existingUser.email,id:existingUser._id},process.env.JWT_SECRET!,{expiresIn:"2h"});
    
//     return res.status(201).json({
//         success:true,
//         message:"New user craeted",
//         data:{
//            email:existingUser.email,
//            token,
//            name:existingUser.name
//         }

//     })

// }

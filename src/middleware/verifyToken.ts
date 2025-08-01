import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{

    const token =req.cookies.token;

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Not authenticated is wrong"
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET!);
    (req as any).user=decoded;
    console.log(decoded);
    return res.status(200).json({
        success:true,
        message:"verify tokrn",
    })

}
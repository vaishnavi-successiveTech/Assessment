import { NextFunction, Request, Response } from "express";
let count=0;
let start= Date.now();
export const basicLimiter=(req:Request,res:Response,next:NextFunction)=>(limit:number,windowTime:number)=>{
    const time=Date.now();
    if(time-start>windowTime){
   count=0;
    start=time;
    }
     if(count<limit){
        count++;
        next();
    }
    else{
        return res.status(429).send("Too many conflicts");
    }
}
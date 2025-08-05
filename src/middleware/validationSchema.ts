import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validationSchema=Joi.object({
    userName:Joi.string().pattern(/^[a-zA-Z]+$/).required(),
    email:Joi.string().email().required(),
})

export const validationStudentSchema=Joi.object({
    name:Joi.string().pattern(/^[a-zA-Z]+$/).required(),
    age:Joi.number().positive().required(),
    grade:Joi.string().required().pattern(/^[A-D]+$/),
    email:Joi.string().email().required(),
})

export const validatelogin=Joi.object({
     email:Joi.string().email().required(),
})

export const userMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try{
    const {error,value}=validationSchema.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({
            success:false,
            message:"Validation does not fullfill",
            errors:error.details.map(e=>e.message)
        })
    }
    console.log("value",value);
    req.body=value;
    next();
}
    catch(error){
        next(error)
    }
}

export const loginMiddleware=(req:Request,res:Response,next:NextFunction)=>{
      try{
    const {error,value}=validatelogin.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(400).json({
            success:false,
            message:"Validation does not fullfill",
            errors:error.details.map(e=>e.message)
        })
    }
    console.log("value",value);
    req.body=value;

    next();}
    catch(error){
        next(error)
    }
}


export const studentMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("dsncd")
  try {
    console.log('calling data')
    const { error, value } = validationStudentSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((e) => e.message),
      });
    }
    console.log(error);
    // Optionally attach the validated value to req.body
    req.body = value;

    next();
  } catch (err) {
    next(err);
  }
};

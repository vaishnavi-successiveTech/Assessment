import { Request, Response, NextFunction } from "express";
import { Student } from "../models/Student";
import jwt from "jsonwebtoken";

export const studentControllers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, grade, name, age } = req.body;

    // Check if user already exists
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(409).json({  // 409 = Conflict
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const newUser = new Student({ email, grade, name, age });
    await newUser.save();

    // Optionally generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "defaultsecret", {
      expiresIn: "1h",
    });

    // Send response
    return res.status(201).json({
      success: true,
      message: "New user created",
      data: {
        email: newUser.email,
        grade: newUser.grade,
        name: newUser.name,
        age: newUser.age,
        token,  // Include token if needed
      },
    });
  } catch (error) {
    next(error); // Use centralized error handling middleware
  }
};


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
















export const filterData=async(req:Request,res:Response,next:NextFunction)=>{
     try{const minAge=parseInt(req.query.minAge as string) || 0;
     const maxAge=parseInt(req.query.maxAge as string)|| 100;
      const page = parseInt(req.query.page as string) || 1;
     const limit=parseInt(req.query.limit as string)|| 5;
     const skip=(page-1)* limit;

     const sortBy=req.query.sortBy as string || "name";
     const order=req.query.order as string === 'desc' ? -1 : 1;

     const students=await Student.find({
      age:{$gte: minAge , $lte:maxAge }
     },
    ).sort({
      [sortBy]:order
    }).skip(skip).limit(limit);

    const total=await Student.countDocuments({age:{$gte:minAge,$lte:maxAge}});

    res.status(200).json({
      page,
     
      total,
      totalPage:Math.ceil(total/limit),
       students

    })}
    catch(error){
      next(error)
    }

}


export const studentUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const newData = await Student.findByIdAndUpdate(id, updatedData, { new: true });

    if (!newData) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student data updated successfully",
      data: newData,
    });
  } catch (error) {
    next(error); 
  }
};



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

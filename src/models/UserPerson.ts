
import mongoose from "mongoose";

export const StudentSchema=new mongoose.Schema({
    userName:{type:String,
        required:true
    },
    email:{type:String,
         required:true,
         unique:true
    }
})
export const UserPerson=mongoose.model("UserPerson",StudentSchema);

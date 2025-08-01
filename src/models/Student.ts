import mongoose from "mongoose";

export const StudentSchema=new mongoose.Schema({
    name:{type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    grade:{type:String,
         required:true,
    },
    email:{type:String,
         required:true,
         unique:true
    },

},
{
    timestamps:true
})

export const Student=mongoose.model("Student",StudentSchema);

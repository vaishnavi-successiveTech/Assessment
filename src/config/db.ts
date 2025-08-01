import mongoose from "mongoose"

export const connectDb=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/NodeTypeScript");
        console.log("Mongodb connected")
        
    } catch (error) {
        console.log("does not connect to MONGODB")
        
    }
}
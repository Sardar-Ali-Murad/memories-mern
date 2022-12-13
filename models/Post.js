import mongoose from "mongoose";

let PostSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Provide The Title"],
        minlength:10,
        // maxlength:80,   
    },
    tag:{
        type:String,
        required:[true,"Please Provide The tag"],
        minlength:4,
        // maxlength:20,   
    },
    message:{
        type:String,
        required:[true,"Please Provide The message"],
        minlength:150,
        // maxlength:250,   
    },
    image:{
        required:[true,"Please Provide The image"],
        type:String
    },
    like:{
        type:Boolean,
        default:true
    },
    
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"Provide the user"]
    }

},{timestamps:true})

export default mongoose.model("MemoriesAppPosts",PostSchema)
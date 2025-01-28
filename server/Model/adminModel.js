const mongoose = require("mongoose")

 const adminSchema  = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "username is required"],
            minLength: [3, "minimum username length is 3"]
        },
    
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email should be unique"],
            lowercase: true
        },
    
        contact: {
            type: Number,
            required: [true, "contact is required"],
            unique: [true, "Number must be unique"]
        },
       
    
        password: { 
            type: String,
            required: [true, "password is required"]
        },
       
        role:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"role"
        }
    
    } , {timestamps:true}
) 



 const adminModel = new mongoose.model("admin",adminSchema)


 module.exports = adminModel
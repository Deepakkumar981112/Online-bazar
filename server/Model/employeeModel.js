const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
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
    avatar: {
        public_id: { type: String, default: "" },
        Url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1729219330287-a914170ca5ee?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    },

    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },

    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,        // matlab hai ki ye field MongoDB ka ek ObjectId store karega.
        ref: "Product"       //future me reference k liye product collection bnaunga 
    }],

    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    password: { 
        type: String,
        required: [true, "password is required"]
    },
    address: {
        country: String,
        street: String,
        city: String,
        state: String,
        country: String,
    },
    
    role:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"role"
    }


}, { timestamps: true })
//{timestamps:true} ye do attribute de deta h --- createdAt and updatedAT....automatically update or create time de dega


const Employee = mongoose.model("employee", EmployeeSchema)
module.exports = Employee
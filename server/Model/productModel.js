const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, "productName is required"],
        lowercase: true
    },

    description: {
        type: String,
        required: [true, "description is required"]
    },

    price: {
        type: Number,
        required: [true, "Price is required"],
        default: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category",       
    },

    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcategory",     
    },

    stock: {
        type: Number,
        required: [true, "stock is required"],
        min: [0, "Stock cannot be negative"],
        default:0
    },


    brand: { type: String },


    ratings: {
        type: Number,
        default: 0
    },


    image: [{
        public_id: { type: String, default: "" },
        Url: {
            type: String,
            default:
                "https://images.unsplash.com/photo-1729219330287-a914170ca5ee?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    }],

}, { timestamps: true })

const productModel = mongoose.model("Product",ProductSchema)

module.exports = productModel;
const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({

    categoryName: {
        type: String,
        required: [true, "CategoryName is required"],
        trim: true,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps:true})


const categoryModel = mongoose.model("category",categorySchema)

module.exports = categoryModel
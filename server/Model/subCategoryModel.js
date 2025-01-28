const mongoose = require("mongoose")

const subcategorySchema = mongoose.Schema({
    subcategoryName: {
        type: String,
        required: [true, "Subcategory name is required"],
        trim: true
    },

    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",                  // Reference to Category
        required: [true, "Category is required"]
    },

    description: {
        type: String,
        default: ""
    }
}, { timestamps: true })


const subcategoryModel = mongoose.model("subcategory",subcategorySchema)

module.exports = subcategoryModel
const categoryModel = require("../Model/categoryModel")

const ErrorHandler = require("../utility/ErrorHandler");
const {catchAsyncError} = require("../utility/asyncWrapper")






//create category
const CreateCategory = catchAsyncError(async (req, res, next) => {

    const { categoryName, description } = req.body
    if (!categoryName || !description) {
        return next(new ErrorHandler("Please provide all the required fields", 400))
    }

    const createCategory = await categoryModel.create({ categoryName, description })

    if (!createCategory) {
        return next(new ErrorHandler(" category creation failed", 422))
    }

    else {
        res.status(200).json({
            success: true,
            message: "category created successfully",
            createCategory
        })
    }
}
)

//viewAllCategory
const viewAllCategory = catchAsyncError(async (req, res, next) => {

    const getcategory = await categoryModel.find()
    if (getcategory) {
        return res.status(200).json({
            success: true,
            message: "All category viewed",
            getcategory
        })
    }
    else {
        return next(new ErrorHandler("Cannot view Category", 400))
    }
}
)

//viewOneCategory
const viewOneCategory = catchAsyncError(async (req, res, next) => {

    const {id} = req.params             
    console.log(req.params.id)
        if (!id) {
            return next(new ErrorHandler("Provide the id of category", 404))
        }

    const getcategory = await categoryModel.findOne({_id:id})   //database me _id field rehti h but hm params me _id nai pass kr skte hame id pass krna pdta h isliye {_id:id} likhe hain.
    if (getcategory) {
        return res.status(200).json({
            success: true,
            message: "One category viewed",
            getcategory
        })
    }
    else {
        return next(new ErrorHandler("Cannot view Category", 400))
    }
}
)


//deleteCategory
const deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params

    if (!id) {
        return next(new ErrorHandler("Provide the id of category", 404))
    }
    const delCategory = await categoryModel.findByIdAndDelete(id)
    if (!delCategory) {
        return next(new ErrorHandler("Cannot delete category"), 400)
    }
    else {
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            delCategory
        })
    }

}
)


//updateCategory
const updateCategory = catchAsyncError(async (req, res) => {
    const { id } = req.params
    if (!id) {
        return next(new ErrorHandler("Provide category id ", 404))
    }
    const { categoryName, description } = req.body
    if (!categoryName || !description) {
        return next(new ErrorHandler("Please provide all the required fields", 400))
    }
    const putCategory = await categoryModel.findByIdAndUpdate(id, { categoryName, description }, { new: true })
    if (!putCategory) {
        return next(new ErrorHandler("cannot update Category", 400))
    }
    else {
        return res.status(200)
    }
}
)

module.exports = { CreateCategory, viewAllCategory, viewOneCategory, deleteCategory, updateCategory }
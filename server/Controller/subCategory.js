const subcategoryModel = require("../Model/subCategoryModel")
const Errorhandler = require("../utility/ErrorHandler")
const {catchAsyncError} = require("../utility/asyncWrapper")
const categoryModel = require("../Model/categoryModel")
// const { findByIdAndDelete } = require("../Model/RoleModel")

//Create Subcategory
const CreateSubcategory = catchAsyncError(async (req, res, next) => {
  const { subcategoryName, categoryName, description } = req.body
  if (!subcategoryName || !categoryName || !description) {
    return next(new Errorhandler("Please provide all the details of Subcategory", 400))
  }

  const category = categoryModel.findOne({ id })
  if (!category) {
    return next(new Errorhandler("cannot find Category", 400))
  }
  const Subcategory = await subcategoryModel.create({ subcategoryName, categoryName: category._id, description })
  if (!Subcategory) {
    return next(new Errorhandler("subcategory creation failed", 422))
  }
  else {
    return (
      res.status(200).json({
        success: true,
        message: "subcategory created successfully",
        Subcategory
      })
    )
  }
})



//view ALL subCategory 
const viewAllsubCategory = catchAsyncError(async (req, res, next) => {
  const getsubCategory = await subcategoryModel.find()
  if (!getsubCategory) {
    return (
      next(new Errorhandler("Cannot view subCategory", 400))
    )
  }
  else {
    return (
      res.status(200).json({
        success: true,
        message: "All subCategory viewed",
        getsubCategory
      })
    )
  }

})


//view One subCategory 

const viewOneSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return next(new Errorhandler("Provide the id of subcategory", 404))
  }

  const getOneSubCategory = await subcategoryModel.findOne(id)
  if (getOneSubCategory) {
    return res.status(200).json({
      success: true,
      message: "One category viewed",
      getOneSubCategory
    })
  }
  else {
    return next(new Errorhandler("Cannot view subCategory", 400))
  }
})


//delete SubCategory
const deleteSubcategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params
  if (!id) {
    return next(new Errorhandler("Provide the id of subcategory", 404))
  }
  const delSubCategory = await subcategoryModel.findByIdAndDelete(id)
  if (!delSubCategory) {
    return (next(new Errorhandler("Cannot delete subcategory", 400)))
  }
  else {
    return res.status(200).json({
      success: true,
      message: "subCategory deleted successfully",
      delCategory
    })
  }
})

//update SubCategory 

const updateSubcategory = catchAsyncError(async (req, res, next) => {

  const { id } = req.params
  if (!id) {
    return next(new Errorhandler("Provide the id of subcategory", 404))   //is Errorhandler code ka mtlb ye hai ki agr params me id dega hi nai (kch bhi nai likhega) toh error return hoga agr id me one (:1  -- is trh ki id database me h bhi nai) bhi de dega toh ye kaam karega. 
  }
  const findSubCategory = await subcategoryModel.findById(id)
  if (!findSubCategory) {
    return next(new Errorhandler("Subcategory not found with the provided ID", 404))
  }

  const { subcategoryName, categoryName, description } = req.body
  if (!subcategoryName || !categoryName || !description) {
    return next(new Errorhandler("Please provide all the details of Subcategory", 400))
  }

  const putSubCategory = await subcategoryModel.findByIdAndUpdate(id, { subcategoryName, categoryName, description }, { new: true })
if(!putSubCategory){
  return next(new Errorhandler("Failed to update subcategory",400))
}
else{
  res.status(200).json(
    {
      success:true, 
      message:"Subcategory updated successfully",
      putSubCategory
    }
  )
}


})

module.exports = { CreateSubcategory, viewAllsubCategory, viewOneSubCategory, deleteSubcategory , updateSubcategory }
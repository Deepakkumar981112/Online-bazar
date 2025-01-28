const subcategoryModel = require("../Model/subCategoryModel")
const Errorhandler = require("../utility/ErrorHandler")
const { catchAsyncError } = require("../utility/asyncWrapper")
const categoryModel = require("../Model/categoryModel")
// const { findByIdAndDelete } = require("../Model/RoleModel")

//Create Subcategory
const CreateSubcategory = catchAsyncError(async (req, res, next) => {

  const { subcategoryName, categoryName, description } = req.body
  if (!subcategoryName || !categoryName || !description) {
    return next(new Errorhandler("Please provide all the details of Subcategory", 400))
  }

  const category = await categoryModel.findOne({ categoryName})
  if (!category) {
    return next(new Errorhandler("cannot find Category", 400))
  }

  const Subcategory = await subcategoryModel.create({ subcategoryName, categoryName:category._id, description })
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
  // console.log(req.params.id)
  if (!id) {
    return next(new Errorhandler("Provide the id of subcategory", 404))
  }
  const delSubCategory = await subcategoryModel.findByIdAndDelete(id)
  if (!delSubCategory) {
    return (next(new Errorhandler("Cannot delete subcategory", 400)))
  }
  else {
    return (res.status(200).json({
      success: true,
      message: "subCategory deleted successfully",
      delSubCategory
    }))
  }
})

//update SubCategory 

const updateSubcategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Extract the subcategory ID from request params

  // Validate if the ID is provided
  if (!id) {
    return next(new Errorhandler("Please provide the ID of the subcategory", 400));
  }

  const { subcategoryName, categoryName, description } = req.body; // Extract fields from request body

  // Validate if all required fields are provided
  if (!subcategoryName || !categoryName || !description) {
    return next(
      new Errorhandler("Please provide all the details of the subcategory", 400)
    );
  }

  // Find the category by its name
  const category = await categoryModel.findOne({ categoryName });
  if (!category) {
    return next(new Errorhandler("Cannot find the specified category", 404));
  }

  // Update the subcategory by its ID
  const putSubCategory = await subcategoryModel.findByIdAndUpdate(
    id,
    {
      subcategoryName,
      categoryName: category._id, // Use the ID of the found category
      description,
    },
    { new: true } // Return the updated document
  );

  // Handle case where update fails
  if (!putSubCategory) {
    return next(new Errorhandler("Failed to update the subcategory", 400));
  }

  // Respond with success if update is successful
  res.status(200).json({
    success: true,
    message: "Subcategory updated successfully",
    putSubCategory,
  });
});





module.exports = { CreateSubcategory, viewAllsubCategory, viewOneSubCategory, deleteSubcategory, updateSubcategory }
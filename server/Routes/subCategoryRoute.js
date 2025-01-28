const express = require("express")
const {CreateSubcategory, viewAllsubCategory, viewOneSubCategory, deleteSubcategory , updateSubcategory} = require("../Controller/subCategory")
const {isAdminAuthenticated} = require("../Middlewares/Auth") 

const subCategoryRoute = express.Router()

subCategoryRoute.get("/subcategory",isAdminAuthenticated,viewAllsubCategory)
subCategoryRoute.get("/subcategory/:id",isAdminAuthenticated,viewOneSubCategory)
subCategoryRoute.post("/subcategory",CreateSubcategory)
subCategoryRoute.put("/subcategory/:id",updateSubcategory)
subCategoryRoute.delete("/subcategory/:id",deleteSubcategory)

module.exports = subCategoryRoute
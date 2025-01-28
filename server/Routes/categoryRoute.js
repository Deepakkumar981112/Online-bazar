const express = require("express")
const {CreateCategory, viewAllCategory, viewOneCategory, deleteCategory, updateCategory} = require("../Controller/category")
const {isAdminAuthenticated} = require("../Middlewares/Auth")

const categoryRoute = express.Router()


categoryRoute.get("/category",viewAllCategory)
categoryRoute.get("/category/:id",viewOneCategory)
categoryRoute.post("/category",CreateCategory)
categoryRoute.put("/category/:id",updateCategory)
categoryRoute.delete("/category/:id",deleteCategory)


module.exports = categoryRoute
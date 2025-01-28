const express = require("express")
const {createAdmin,AdminSignIn, getAllAdmin, getOneAdmin, deleteAdmin, putadmin } = require("../Controller/admin")

const {isAdminAuthenticated} = require("../Middlewares/Auth")
const AdminRoute = express.Router()


AdminRoute.get("/admins",isAdminAuthenticated,getAllAdmin)
AdminRoute.get("/admin/:id",isAdminAuthenticated,getOneAdmin)


AdminRoute.post("/admin",createAdmin)
AdminRoute.post("/admin/singin",AdminSignIn)   //admin singin


AdminRoute.delete("/admin/:id",deleteAdmin)
AdminRoute.put("/admin/:id",putadmin)


module.exports = AdminRoute
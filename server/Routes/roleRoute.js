const express = require("express")
const { getAllRole, getOneRole, createRole, updateRole, deleteRole } = require("../Controller/role")

const RoleRoute = express.Router()


RoleRoute.get("/roles",getAllRole)
RoleRoute.get("/role/:id",getOneRole)
RoleRoute.post("/role",createRole)
RoleRoute.put("/role/:id",updateRole)
RoleRoute.delete("/role/:id",deleteRole)




module.exports = RoleRoute  
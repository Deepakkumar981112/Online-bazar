const express =  require("express")

 const {createEmployee,getAllEmployee,getOneEmployee,deleteEmployee,putEmployee, EmployeeSingin } = require("../Controller/employee")
 const { isEmployeeAuthenticated } = require("../Middlewares/Auth")
 const EmployeeRoute = express.Router()


EmployeeRoute.get("/employees",isEmployeeAuthenticated,getAllEmployee)
// EmployeeRoute.get("/employees",getAllEmployee)
EmployeeRoute.get("/employee/:id",isEmployeeAuthenticated,getOneEmployee)

EmployeeRoute.post("/employees/singin", EmployeeSingin)
EmployeeRoute.post("/employee",createEmployee)

EmployeeRoute.delete("/employee/:id",deleteEmployee)

EmployeeRoute.put("/employee/:id",putEmployee)


module.exports = EmployeeRoute  
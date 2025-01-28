const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utility/ErrorHandler");
const Employee = require("../Model/employeeModel");
const Admin = require("../Model/adminModel");
const adminModel = require("../Model/adminModel");


exports.isEmployeeAuthenticated = async (req, res, next) => {
   const cookie1 = req.cookies.cookie      //req.cookies ek method h jo cookie lega jo hm log employee controller k andr bnaye hain. cookie k andr bs token rehta h toh cookie1 k andr token h.
   if (!cookie1) {
      return next(new ErrorHandler("Povide Token", 400));
   }

   const decriptToken = jwt.verify(cookie1, process.env.Token_Secrete_key); //jwt.verify kya krta h - jo hamara token(jo dedecripted h) usko phr se payload(string) me convert krta h 
   if (!decriptToken) {
      return next(new ErrorHandler("Invalid cookie1", 401));
   }

   const employee = await Employee.findById(decriptToken._id); //extra likha h check krne k liye ki employee h bhi ya nai (payload k andr details hain wo sahi h ya nai )

   if (!employee) {
      return next(new ErrorHandler("Invalid cookie paylod", 401));
   }
   //  req.employee = employee;  //
   next()

}



exports.isAdminAuthenticated = async (req, res, next) => {
   const cookie1 = req.cookies.AdminCookie

   if (!cookie1) {
      return next(new ErrorHandler("Provide token", 400))
   }

   const decriptToken = jwt.verify(cookie1, process.env.Token_Secrete_key)

   if (!decriptToken) {
      return next(new ErrorHandler("Invalid cookie1", 401))
   }

   const Admin = await adminModel.findById(decriptToken._id)

   if (!Admin) {
      return next(new ErrorHandler("Invalid cookie payload", 401))
   }

   next()
}




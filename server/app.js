// const env = require("dotenv")     
// env.config({path:"./.env"})     
 require("dotenv").config({path:"./.env"})      // 1 or 2 line ka code combined h 3 
const express = require("express")
const morgan = require('morgan')     //what does morgan do ?
require("./Model/Database/Database").connectDatabase()       //importing  connection with database 
const bodyParser = require('body-parser');      //body parser 

const cookieParser = require('cookie-parser'); //Client ke HTTP request headers se cookies ko extract aur parse karta hai.Cookies ko JavaScript objects me convert kar deta hai



// const {version} = require("mongoose")


const RoleRoute = require("./Routes/roleRoute")
const EmployeeRoute = require("./Routes/employeeRoute")
const AdminRoute = require("./Routes/adminRoute")
const categoryRoute = require("./Routes/categoryRoute")
const subCategoryRoute = require("./Routes/subCategoryRoute")





const app = express()  
    

// order of the working middle ware is synchronous 
app.use(express.json())                         //middleware for parsing data in json format(/postman k body me raw se jo data bhjte hain usko encode krta h )

// app.use(bodyParser.json())                      //body parser middleware 

app.use(express.urlencoded({extended:true}))   //doubt ?? //postman k body me formdata se jo data bhjte hain usko encode krta h ab client-side forms se aapko data receive karna ho, to express.urlencoded() middleware use karte hain. Agar form data me nested objects hain, to extended: true set karna zaruri hai.

app.use(cookieParser());   //app.use(cookieParser()); ka use Express.js applications me cookies ko parse karne ke liye hota hai. Yeh middleware HTTP request ke headers me jo cookies aati hain, unko JavaScript object ke format me convert karta hai aur req.cookies me store kar deta hai, jisse aap cookies ko easily access aur manipulate kar sakte ho.


app.use(morgan("tiny"))     //logger -- server ki activities ki information terminal pe show krta h



app.use("/api/v1",RoleRoute)                //Role        //v1 is the version of api //
app.use("/api/v1", EmployeeRoute)           //employee
app.use("/api/v1",AdminRoute)               //Admin
app.use("/api/v1",categoryRoute)            //Category
app.use("/api/v1",subCategoryRoute)            //subCategory


    


//hamesha Error middleware ko baki sb middlewares k niche likhte hain? why?
app.use((err, req, res, next) => {
    let message = err.message;
    let statusCode = err.statusCode || 500;
    let stack = err.stack;  //err.stack error ka stack trace deta hai. Yeh batata hai ki error kis function, line number, aur file path me aayi. 

    res.status(statusCode).json({
        error: message,
        stack: stack
    });
});



const PORT = process.env.PORT || 5000


app.listen(PORT ,()=>{
    console.log(`listening at port ${PORT}`)
})






// ---KT-----

// Environment Configuration:
// dotenv ka use karke .env file se environment variables load ho rahe hain, jisse sensitive information (jaise PORT, database credentials) manage ki ja sake.

// Server Setup:
// express framework ko import karke app banaya gaya hai jo server ki request handle karega.

// Middlewares ka Use:
// express.json(): Yeh middleware JSON data ko parse karta hai jo request body mein hota hai.
// express.urlencoded({ extended: false }): Yeh middleware URL-encoded data ko parse karta hai, jaha extended: false ka matlab hai ki nested objects ko parse nahi karega.

// Morgan Logging:
// morgan("tiny"): Server requests ko log karta hai (e.g., request method, status code), taaki server ki activities terminal mein dekhi ja sake.

// Server Listening:
// app.listen(): Server ko specified PORT pe listen karne ke liye start karta hai, taaki requests ko handle kiya ja sake.
// Yeh code basic Express server setup karta hai environment variables, middlewares, logging, aur server listening ke sath.
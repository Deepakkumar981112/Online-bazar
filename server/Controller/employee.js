const Employee = require("../Model/employeeModel")
const Role = require("../Model/RoleModel")
const ErrorHandler = require("../utility/ErrorHandler")
const generateToken = require("../utility/generateToken")





//create employee(signUP)

const createEmployee = async (req,res,next)=>{
    try{
        const {name,email,contact,gender,password,address,role} = req.body
        console.log(req.body)
        
        if(!name|| !email|| !contact|| !gender|| !password|| !address|| !role){ return next(new ErrorHandler("Please Provide all required Fields",400))}

        const Rolename11 = await Role.findOne({RoleName:role})   //Role.findOne({RoleName:role}) se role ki ID mil rahi hai, jo Employee model ke role field mein save ho rahi hai. Ensure karo ki Role model mein RoleName unique ho.)

        // console.log(Rolename11)

        if(Rolename11.RoleName == "admin"){                          //agr koi frontend se , form me Role me admin  bhjega toh apne app hi admin bn jayega jo hame nai chahiye agr admin k alwa kch or bhje toh chalega pr admin nai.
            
            return next(new ErrorHandler("Invalid Role",400))
        }

        if(!Rolename11) return next(new ErrorHandler("Invalid Role Name",400));

        // console.log(Rolename11)


        const createEmp = await Employee.create({name,email,contact,gender,password,address,role:Rolename11._id})  //iska matlab hai ki hum Role model se milne wali specific role ki ID ko Employee model ke role field mein save kar rahe hain. Yeh ek reference relationship create karta hai jo foreign
        if(createEmp){
            const payload = {
                _id: createEmp._id,
                email: createEmp.email,
                role: Rolename11.RoleName    
            }

            const token = await generateToken(payload)

            const options = {          //cookie ka expiry time 
                maxAge: 3600000 *13,  // 1 hour in milliseconds   
                httpOnly: true,      // Recommended for security
            }
            res.cookie("cookie", token,options)

           return res.status(201).json({
                success:true,
                message:"Employee created successfully",
                createEmp
            })
        }
        else{
           next(new ErrorHandler("Employee was not created",400))
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong in createEmployee",
            error:error.message
        })
    }
}




//Employee signin (JWT)
const EmployeeSingin = async (req,res,next) =>{

    const {email,password} = req.body;
    console.log(req.body);

    const employee = await Employee.findOne({email:email}).populate("role") //.populate - Agar aapke database me ek collection doosre collection ke data ko reference ke taur par store karta hai (using ObjectId), to .populate use karke us reference field ka pura data retrieve kar sakte hain. Ye database ke join operation jaise kaam karta hai.

    console.log(employee)
    if(!employee){
        return next(new ErrorHandler("Invalid email ID of employee",400));
    } 

    if(employee.password != password){
        return next(new ErrorHandler("Invalid password of employee",400))
    }

    const payload = {
        _id: employee._id,
        email: employee.email,
        role: employee.role.RoleName
    }

    const token = await generateToken(payload);

    const options = {
        maxAge: 3600000 *13, // 1 hour in milliseconds   
        httpOnly: true, // Recommended for security
    }

    res.cookie("cookie", token,options) //cookie ka naam h "cookie"

    res.status(200).json({
        message:"employee singin succufully",
        success:true,
        token
    })

}



// //view All Employee
const getAllEmployee = async (req,res, next)=>{
    try{

        const getAllEmp = await Employee.find()
        return res.status(200).json({
            success:true,
            message:"Employee viewed",
            getAllEmp
        })
    }
    catch(error){
     return next( new ErrorHandler("Internal Server Error" , 500))
    }
}


    


// //view one Employee
const getOneEmployee = async (req,res)=>{

    try {
        const { id } = req.params   // const id = req.params.id      
  
        const OneRole = await Employee.findById(id)
        if (OneRole) {
            res.status(200).json({
                OneRole,
                message: "Employee viewed",
                success: true
            })
        }
    }


    catch(error){
        res.status(500).json({
            success:false,
            message:"something went wrong in getAllEmployee"
        })
    }
}



//delete Employee 
const deleteEmployee = async (req,res,next) =>{
    try{
        const {id} = req.params
                console.log(req.params)
        const deleteEmp = await Employee.findByIdAndDelete(id)
    
        if(deleteEmp){
            return res.status(200).json({
                success:true,
                message: "Employee deleted successfully",
                deleteEmp
            })
        }
        
        else{
           return next( new ErrorHandler("could not delete Employee",400))
           
        }
    }
    catch(error){
        return (
            next( new ErrorHandler("Internal server Error",500))
        )
    }
}


//update Employee
const putEmployee = async (req,res,next)=>{

    try{
    const {id} = req.params;
    const {name,email,contact,gender,password,address,role} = req.body

    const updateEmp = await Employee.findByIdAndUpdate(id , {name,email,contact,gender,password,address,role} , {new : true})
        if(!updateEmp){
            return next (new ErrorHandler("Role could not be updated",400))
        }
        else{
           return res.status(200).json({
                success:true ,
                message:"Employee updated successfully ",
                updateEmp
            })
        }
    }
    catch(error){
        return next(new ErrorHandler("Internal Server Error", 500))
    }
}


module.exports = {createEmployee,getAllEmployee,getOneEmployee,deleteEmployee, putEmployee, EmployeeSingin }
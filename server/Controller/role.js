const Role = require("../Model/RoleModel");
const ErrorHandler = require("../utility/ErrorHandler");


// create role 
const createRole = async (req, res, next) => {
    try {
        const { RoleName } = req.body;   //req.body ek object h jisse hm RoleName naam ki property ko extract kr rahe hain (http request ki body se)
        
        if(!RoleName){
            return new ErrorHandler("Please provide RoleName",400)
        }
         console.log(RoleName);


        const role = await Role.create({ RoleName });

        if (role) {
            return res.status(201).json({
                role,
                message: "Role created successfully",
                success: true
            });
        } else {
            next(new ErrorHandler("Role creation failed", 422))
        }
    } catch (error) {
        next(new ErrorHandler("Internal Server Error", 500)); // Error ko middleware tak bhejne ke liye next(error) call karenge
    }
};



// view all roles
const getAllRole = async (req, res, next) => {
    try {
        const Roles = await Role.find()
        res.status(200).json({
            Roles,
            message: "Role viewed",
            success: true
        })
    }
    catch (error) {
        next(new ErrorHandler("Internal Server Error", 500))
    }
}



// view one role 
const getOneRole = async (req, res, next) => {
    try {
        const { id } = req.params   // const id = req.params.id      
  
        const OneRole = await Role.findById(id)
        if (OneRole) {
            res.status(200).json({
                OneRole,
                message: "Role viewed",
                success: true
            })
        }
    }

    catch (error) {
      next( new ErrorHandler("Internal Server Error",500))
    }
}




//delete Role 
const deleteRole = async (req, res , next) => {
    try {
        const { id } = req.params;

        const delRole = await Role.findByIdAndDelete(id);
        console.log(delRole)
        if (delRole) {
            return res.status(200).json({
                delRole,
                success: true,
                message: "Role deleted successfully",
            });
        } else {
             return next(new ErrorHandler( "Could not delete Role" , 400))
        }
    } catch (error) {
       return next(new ErrorHandler("Internal Server Error" , 500))

    }
};





//update Role 
const updateRole = async (req, res) => {
    try {
        const { id } = req.params
        const { RoleName } = req.body


        const updRole = await Role.findByIdAndUpdate(id, { RoleName }, { new: true })   //new : true is liye likhe hain taki ye upRole funciton hamesha updated body return kare kabhi kabhi purana wala change kr deta h isliye 

        if (updRole) {                // agr updRole update hua h 
            res.status(200).json({
                updRole,
                success: true,
                message: "Role updated successfully"    
            })
        }

        else {
            next( new ErrorHandler("Role could not be updated",400))
        }
    } catch (error) {
        next( new ErrorHandler("Internal Server Error",500))
    }
}


module.exports = { createRole, getAllRole, getOneRole, deleteRole, updateRole }
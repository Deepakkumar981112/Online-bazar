const adminModel = require("../Model/adminModel")

const Role = require("../Model/RoleModel")

const ErrorHandler = require("../utility/ErrorHandler")

const generateToken = require("../utility/generateToken")



//Admin singUP
const createAdmin = async (req, res, next) => {
    try {
        const { name, email, contact, password } = req.body     //body se role nai denge kyuki hme ek hi role chahiye (admin ). RoleName: "admin", hm log hard code de rahe hain.   

        if (!name || !email || !contact || !password) {
            return next(new ErrorHandler("Please Provide all requird Fields", 400))
        }

        const findAdmin = await Role.findOne({ RoleName: "admin" })  //ye ek document dega phr findAdmin se hm admin ki id le lenge 
        console.log(findAdmin)


        const createAdm = await adminModel.create({ name, email, contact, password, role: findAdmin._id })
        if (createAdm) {

            const payload = {
                _id : createAdm._id,
                email:createAdm.email,
                role:createAdm.role
            }

            const token = generateToken(payload)

            const options = {
                maxAge : 3600000 *13,
                httpOnly: true,
            }

            res.cookie("AdminCookie",token,options)

            return res.status(201).json({
                success: true,
                message: "Admin created succesfully",
                createAdm
            })
        }
        else next(new ErrorHandler("Admin was not created", 400))

    }
    catch{
        return next(new ErrorHandler("Internal Server Error", 500))
    }

}




//Admin singIN
const AdminSignIn = async (req,res, next) =>{
    const {email , password} = req.body

    if(!email || !password){
        return next (new ErrorHandler("Please Provide all requird Fields", 400))
    }

    const Admin  = await adminModel.findOne({email:email}).populate("role")
    console.log(Admin)
    if(!Admin){
        return next(new ErrorHandler("Invalid email ID of Admin",400));
    }
    if(Admin.password != password ){
        return next(new ErrorHandler("Invalid password of Admin",400));
    }

    const payload = {
        email:Admin.email,
        _id:Admin._id,
        role:Admin.role.RoleName
    }
    console.log(payload)

    const token = await generateToken(payload)

    options = {
        maxAge : 3600000 *13,
        httpOnly: true,
    }

    res.cookie("AdminCookie",token,options)

    return res.status(201).json({
        success: true,
        message: "Admin singin Sucessfull",
        Admin
    })
}





const getAllAdmin = async (req, res, next) => {
    try {
        const getAlladm = await adminModel.find()
        if (getAlladm) {
            res.status(200).json({
                success: true,
                message: "Admin viewed",
                getAlladm
            })
        }
        else next(new ErrorHandler("cannot view Admins", 400))
    }
    catch (error) {
        next(new ErrorHandler("Internal Server Error", 500))
    }

}



const getOneAdmin = async (req, res, next) => {
    try {
        const { id } = req.params

        const getOneadm = await adminModel.findById(id)

        if (getOneadm) {
            return res.status(200).json({
                success: true,
                message: "viewed Admin",
                getOneadm
            })
        }
        else {
            return next(new ErrorHandler("cannot view Admin", 400))
        }
    }
    catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500))
    }
}


    

const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.params

        const deleteadm = await adminModel.findByIdAndDelete(id)
        if (deleteadm) {
            res.status(200).json({
                success: true,
                message: "Admin deleted successfully",
                deleteadm
            })
        }
        else {
            return next(new ErrorHandler("Could not delete Employee", 400))
        }

    }
    catch (error) {
        next(new ErrorHandler("Internal Server Error", 500))
    }
}



const putadmin = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return next(new ErrorHandler("Please provide id ", 404))
        }
        const { name, email, contact, password } = req.body
        if (!name, !email, !contact, !password) {
            return next(new ErrorHandler("please provide all the credentials"))
        }

        const putAdmin = await adminModel.findByIdAndUpdate(id, { name, email, contact, password }, { new: true })
        if (!putAdmin) {
            return next(new ErrorHandler("Admin could not be updated", 400))
        }
        else {
            return res.json({
                success: true,
                message: "Admin updated successfully",
                putAdmin
            })
        }
    }
    catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500))
    }
}
 



module.exports = { createAdmin,AdminSignIn ,getAllAdmin, getOneAdmin, deleteAdmin, putadmin } 
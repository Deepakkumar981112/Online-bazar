const productModel = require("../Model/productModel")

const ErrorHandler = require("../utility/ErrorHandler")


//Product singUP        
const productSingUP = async (req,res,next) =>{

    const {productName,description,price,stock,brand,ratings} = req.body

    if(!productName || !description || !price || !stock || !brand || !ratings){
        return next(new ErrorHandler("Please provide all fields ",400))
    }
    const createProduct = await productModel.create()

}
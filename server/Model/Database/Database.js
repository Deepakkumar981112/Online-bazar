const mongoose = require("mongoose")

exports.connectDatabase = async () => {        //ye ek asynchronous arrow funtion h 
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connected successfully")
    }
    catch (error) {
        console.log(error)
    }
}


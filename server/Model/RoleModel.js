    const mongoose = require("mongoose")

    const RoleSchema = new mongoose.Schema(
        {
            RoleName: {
                type: String,
                unique: [true, "RoleName must be unique"],
                required: [true, "RoleName is required"],
                trim: true,     //automatically removes any whitespace from the beginning and end of the string before saving it to the database.
                lowercase: true
            }
        }, { timestamps: true }
    )


    const Role = mongoose.model("role",RoleSchema)        //Role is the name of model and role is the name of the collection (Mongoose ka Model ek blueprint hai jo MongoDB ke collections ke saath interact karne ke liye banaya jata hai. ) and RoleSchema is the Schema( Mongoose ka schema is the blueprint of the document )

    module.exports = Role




    
const jwt = require("jsonwebtoken");


const generateToken = async (payload) => {

    
    const token = await jwt.sign( payload , process.env.Token_Secrete_key , { expiresIn: process.env.Token_expiry });   
    // const token = await jwt.sign( payload , process.env.Token_Secrete_key , { expiresIn: process.env.Token_expiry });   
    return token;
}

module.exports = generateToken;
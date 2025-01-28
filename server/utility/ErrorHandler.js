class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message,statusCode);
        this.message = message,  
        this.statusCode = statusCode
    }
}       

module.exports = ErrorHandler;

//Is class ko hm log ko customised error k liye bnate hain.
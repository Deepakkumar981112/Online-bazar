

// chai or code (chai or backend video 9, time: 30min)

exports.catchAsyncError = (func) => (req,res,next) =>{
    Promise.resolve(func(req,res,next)).catch(next);
}



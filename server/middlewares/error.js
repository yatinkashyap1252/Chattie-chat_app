const errormiddleware=(err,req,res,next)=>{
    err.message ||="Internal server problem"      //err.message mila hai toh thik hai nai toh fir internal server problem
    err.statusCode ||=500

    if(err.code===11000){
        err.statusCode=400,
        err.message=`${Object.keys(err.keyPattern).join(',')} is already exixst!`
    }

    if(err.message==="JsonWebTokenExpire"){
        err.message="Your session has expired"
        err.statusCode="400"
    }

    if(err.name==="CastError"){
        err.message=`Invalid Info provided at ${err.path}!`
        err.statusCode=400
    }
    // console.log(err)

    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}

const TryCatch=(passedFunc)=>async(req,res,next)=>{
    try {
        await passedFunc(req,res,next)
    } catch (error) {
        next(error)
    }
}

export {errormiddleware,TryCatch}
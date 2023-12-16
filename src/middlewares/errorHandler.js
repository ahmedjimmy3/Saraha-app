const errorHandler = (error,req,res,next)=>{
    console.log(error)
    return res.status(500).json({message:'Internal server error'})
}
export default errorHandler 


// const errorHandler = (error,req,res,next)=>{
//         return res.status(error.cause || 500).json({errorMsg:error.message})
// }
// export default errorHandler 



// return next(new Error('updated failed' , {cause: 400}))
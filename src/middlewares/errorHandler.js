const errorHandler = (error,req,res,next)=>{
    console.log(error)
    return res.status(400).json({stack:error.message})
}
export default errorHandler 
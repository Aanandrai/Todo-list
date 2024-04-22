const jwt=require("jsonwebtoken")
require("dotenv").config();

exports.auth=async(req,res,next)=>{
    try{
        const token=req.body.token || req.cookies.token ;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is not Found"
            });
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;

        }  
        catch(err){
            res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();

    }
    catch(err){
        res.status(401).json({
            success:false,
            message:err.message
        })
    }
}
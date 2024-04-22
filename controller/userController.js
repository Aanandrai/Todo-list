const userModel=require("../model/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


// signUp controller 
exports.signUp= async(req,res)=>{

    try{
        const {userName, email, password ,confirmPassword}=req.body;

        if(!userName || !email || !password){
            return res.json({
                success:false,
                message:"few data field is empty"
            });
        }

        if(password !=confirmPassword){
            return res.json({
                success:false,
                message:"password and confirm are not same"
            });
        }

        const oldUser=await userModel.findOne({email:email});

        if(oldUser){
            return res.json({
                success:false,
                message:"User already present"
            })

        }

        const newPass= await bcrypt.hash(password,10);

        const user= new userModel({
            userName,
            email,
            password:newPass,
            confirmPassword
        })

        await user.save();

        return res.json({
            success:true,
            message:"user register successfully"
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }

}

// login controller 
exports.login=async(req,res)=>{

    try{
        const {email ,password}=req.body;

        const user=await userModel.findOne({email:email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        if( await bcrypt.compare(password, user.password)){
            const payload={
                email:user.email,
                id:user.id
            }

            const token= jwt.sign(payload,process.env.JWT_SECRET);

            user.password=undefined;

            const option={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
            }

            return res.cookie("token", token ,option).status(200).json({
                success:true,
                message:"user login successfully"
            })
        }

        else{
            return res.json({
                success:false,
                message:"incorrect Password"
            })
        }
    }
    catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}

exports.updatePassword=async(req,res)=>{

    try{
        const {password ,newPassword}=req.body;

        const token=req.cookies.token;

        payload=jwt.verify(token,process.env.JWT_SECRET);

        let user=await userModel.findById(payload.id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        if(!bcrypt.compare(user.password,password)){
            return res.json({
                success:false,
                message:"incorrect password"
            })
        }

        user.password=await bcrypt.hash(newPassword,10);
        await user.save();

        return res.json({
            success:true,
            message:"Password change successfuly"
        })

    }
    catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }

}


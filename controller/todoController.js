const todoModel=require("../model/todoModel");
const userModel=require("../model/userModel")
exports.getUserAllTodo=async(req,res)=>{
    try{
        const id=req.user.id;

        const data=await todoModel.find({user:id})

        return res.status(200).json({
            success:true,
            data:data
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.createTodo=async (req,res)=>{
    try{
        const { todoTitle}=req.body;
        const id=req.user.id;

        if(!todoTitle){
            return res.json({
                sucess:false,
                message:"Name of todo list can not be empty"
            })
        }

        const data=await todoModel.create({
            todoTitle,user:id
        })

        const newUser=await userModel.findByIdAndUpdate(id, {$push :{todo:data._id}},{new:true});


        return res.json({
            success:true,
            message:"todo is created"
        })
    }
    catch(err){
        return res.status(500).json({
            suceess:false,
            message:err.message
        })
    }
}
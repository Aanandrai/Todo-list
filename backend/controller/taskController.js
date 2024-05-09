const taskModel=require("../model/taskModel");
const todoModel=require("../model/todoModel")
 
exports.getAlltaskOfTodo=async(req,res)=>{
    try{
        const {todoId}=req.body;

        if(!todo){
            return res.json({
                success:false,
                message:"todo Id can't be empty"
            })
        }

        const data=await taskModel.find({
            todo:todoId
        })

        return res.json({
            success:true,
            data:data,
            message:"user get the all task of specific todo"
        })
    }
    catch{
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.createTask=async(req,res)=>{
    try{
        const {title , description, todo}=req.body;
        
        if(!title || !todo){
            return res.json({
                success:false,
                message:"title or todo can not be empty"
            })
        }

        let todos=await todoModel.findOne({todo:todo});
        if(!todo){
            return res.json({
                success:false,
                message:"This todo doesnot exist"
            })
        }

        const data=await taskModel.create({title, description ,todo});

        const updateTodo=await todoModel.findByIdAndUpdate(todo,{$push :{task:data_id}},{new:true});

        return res.json({
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
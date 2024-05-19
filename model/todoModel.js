const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema({

    todoTitle:{
        type:String,
        required:true
    },

    complete:{
        type:Boolean,
        default:false
    },

    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"taskModel",
    }],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        require:true
    }

});

const todoModel=mongoose.model("todoModel",todoSchema);
module.exports=todoModel;

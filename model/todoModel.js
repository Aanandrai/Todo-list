const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema({

    todoTitle:{
        type:String,
        require:true
    },

    status:{
        type:String,
        enum:["complete","inProgress","pending"],
        default:"pending"
    },

    tasks:[{
        type:mongoose.Schema.ObjectId,
        ref:"taskModel",
    }],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"userModel",
        require:true
    }

});

const todoModel=mongoose.model("todoModel",todoSchema);
module.exports=todoModel;
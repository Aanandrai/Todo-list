const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
    },

    complete:{
     type:Boolean,
     default:false
    },

    todo:{
        type:mongoose.Schema.ObjectId,
        ref:"todoModel",
        required:true
    }
});

const taskModel=mongoose.model("taskModel",taskSchema);
module.exports=taskModel;

const mongoose=require("mongoose"); 

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },

    description:{
        type:String,
    },

    status:{
        type:String,
        enum:["complete","inProgress", "pending"],
        default:"pending"
    },

    todo:{
        type:mongoose.Schema.ObjectId,
        ref:"todoModel",
        require:true
    }
});

const taskModel=mongoose.model("taskModel",taskSchema);
module.exports=taskModel;
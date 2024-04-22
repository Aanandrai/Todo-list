const express=require("express");



const taskRouter=express.Router();


taskRouter.get("getAlltaskOfTodo",auth,getAllTask);
taskRouter.post("createTask",auth ,createTask);

module.exports=taskRouter;
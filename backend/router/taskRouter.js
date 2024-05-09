const express=require("express");
const {auth}=require("../middleware/isAuth");
const {getAlltaskOfTodo,createTask}=require("../controller/taskController")

const taskRouter=express.Router();


taskRouter.get("getAlltaskOfTodo",auth,getAlltaskOfTodo);
taskRouter.post("createTask",auth ,createTask);

module.exports=taskRouter;
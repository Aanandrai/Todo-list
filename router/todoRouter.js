const express=require("express");
const todoRouter=express.Router();


const {getUserAllTodo, createTodo}=require("../controller/todoController")
const {auth}=require("../middleware/isAuth");

todoRouter.get("/getTodo" ,auth,getUserAllTodo);

todoRouter.post("/createTodo",auth,createTodo)


module.exports=todoRouter;
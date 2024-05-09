const express=require("express");
require("dotenv").config();
const cookieParser=require("cookie-parser");

const userRouter=require("./router/userRouter");
const todoRouter=require("./router/todoRouter")
const taskRouter=require("./router/taskRouter")

const dbConnect=require("./config/dataBase");
const Port=process.env.PORT || 4000;

dbConnect();
app=express();
app.use(cookieParser())
app.use(express.json());

 
app.use("/user",userRouter);
app.use("/todo",todoRouter);
app.use("/task",taskRouter);





app.listen(Port, ()=>{
    console.log(`app is listening at ${Port}`);
})

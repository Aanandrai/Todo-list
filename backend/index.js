const express=require("express");
const mongoose = require("mongoose")
const cookieParser=require("cookie-parser");
const dotenv = require("dotenv");
const cors=require('cors')



dotenv.config();
const userModel = require("./model/userModel.js");
const userRouter=require("./router/userRouter.js");
const taskRouter=require("./router/taskRouter.js");
const dbConnect=require("./config/dataBase");




const app=express();
app.use(express.json());
app.use(cookieParser())

app.use(cors(
    {
        origin : ["http://localhost:5173"],
        credentials : true
    }
));




dbConnect();
app.use("/todo",todoRouter);
app.use("/user", userRouter);
app.use("/task",taskRouter);

const Port=process.env.PORT || 4000;


app.listen(Port, ()=>{
    console.log(`app is listening at ${Port}`);
})

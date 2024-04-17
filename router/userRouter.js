const express=require("express");
const {signUp,login,updatePassword} =require("../controller/userController");
const userModel = require("../model/userModel");
userRouter=express.Router();

userRouter.post("/signUp",signUp);
userRouter.post("/login",login);

userRouter.patch("/updatePassword",updatePassword);

// userRouter.patch("/updatePassword")


module.exports=userRouter;




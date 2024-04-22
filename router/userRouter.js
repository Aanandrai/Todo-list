const express=require("express");
const {signUp,login,updatePassword} =require("../controller/userController");
const userModel = require("../model/userModel");
const {auth}=require("../middleware/isAuth");
userRouter=express.Router();

userRouter.post("/signUp",signUp);
userRouter.post("/login",login);

userRouter.patch("/updatePassword",auth ,updatePassword);
module.exports=userRouter;




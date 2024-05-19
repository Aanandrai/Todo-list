const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    userName:{
    type:String,
    required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    
    password:{
        type:String,
        required:true,
        
    },

    confirmPassword:{
        type:String,
        required:true,
       
    },

    todo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"todoModel"
    }]

});

userSchema.pre("save",function(){
    this.confirmPassword=undefined
});
const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;

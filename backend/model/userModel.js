const mongoose=require("mongoose"); 

const userSchema=new mongoose.Schema({
    userName:{
    type:String,
    require:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },
    
    password:{
        type:String,
        require:true,
        
    },

    confirmPassword:{
        type:String,
        require:true,
       
    },

    todo:[{
        type:mongoose.Schema.ObjectId,
        ref:"todoModel"
    }]

});

userSchema.pre("save",function(){
    this.confirmPassword=undefined
});
const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;

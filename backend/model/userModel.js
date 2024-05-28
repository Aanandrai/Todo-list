const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
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

    // tokens : [
    //     {
    //         token:{type:String,require:true}
    //     }
    // ],
    
    todo:[{
        type:mongoose.Schema.ObjectId,
        ref:"todoModel"
    }]

},{ collection: "Signup" });

userSchema.pre("save",function(){
    this.confirmPassword=undefined
});
const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;
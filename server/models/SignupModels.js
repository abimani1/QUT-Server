const mongoose=require('mongoose')



const signupModel=mongoose.Schema({
    clientName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    phoneNumber:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    client:{
        type:Boolean,
    },
    vendor:{
        type:Boolean,
        default:"false"
    }
},{timestamps:true})

const signupUser=mongoose.model("signup",signupModel);

module.exports=signupUser;


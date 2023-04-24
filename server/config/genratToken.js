const  jwt =require('jsonwebtoken')
require('dotenv').config();

const  generateToken=(id)=>{
    return jwt.sign({id},process.env.JSW_SECRET,{
        expiresIn:"30D",
    });
}

module.exports=generateToken;
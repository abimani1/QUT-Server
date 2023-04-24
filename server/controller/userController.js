const asynchandler=require('express-async-handler');
const twilio = require('twilio');
const User=require('../models/SignupModels');
const Vendor=require('../models/vendorModels');

const signupUser=asynchandler(async(req,res)=>{
    let client='true'
    const {clientName,email,phoneNumber,password,vendor}=req.body;

    if(!clientName || !email || !phoneNumber || !password){
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists =await User.findOne({email})
    if(userExists){
        res.status(400);
        throw new Error("user already exists");
    }

    const user=await User.create({
        clientName,
        phoneNumber,
        email,
        password,
        client,
        vendor
    });
    
    if(user){
        res.status(201).json({
            _id:user._id,
            clientName:user.clientName
        });
    }else{
        res.status(400);
        throw new Error("Failer to Create the user")
    }
});

const signinUser=asynchandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("Please Enter all the Feilds")
    }
    const cheackUser=await User.findOne({"email":email,"password":password},{})
    if(cheackUser){
        res.status(200).json(cheackUser)
        // res.send("Login Successfuly")
    }else{
        res.status(400)
        throw new Error("Invaid email and password")
    }
})
const userData=asynchandler(async(req,res)=>{
    const {email}=req.body;
    if(!email){
        res.status(400)
        throw new Error("email is not get")
    }
    const cheackUser=await User.findOne({"email":email},{})
    if(cheackUser){
        res.status(200).json(cheackUser)
        // res.send("Login Successfuly")
    }else{
        res.status(400)
        throw new Error("Invaid email and password")
    }
})

// const userData=asynchandler(async(req,res)=>{
//     try{
//         const {email}=req.body
//         // const getAll=await User.find({"email":email},{})
//         const getAll=await rfq.find({"email":"abimaniyam@gmail.com"},{})
//         res.status(200).json(getAll)
//     }catch(error){
//         res.status(400).json({message:error.message})
//     }
// })

// Vendor data

const vendorData=asynchandler(async(req,res)=>{
    const{categoriesService,city,moblieNumber,vendorName,_id,email}=req.body
    try{
        if(!categoriesService || !city || !moblieNumber || !vendorName){
            res.status(400)
            res.send(`Enter the all the filed`)
        }
        const moblieExit=await Vendor.findOne({moblieNumber})
        if(moblieExit){
            res.status(401)
            res.send(`moblie Number is alread exit`)
        }
        const createVendor=await Vendor.create({
            categoriesService,
            moblieNumber,
            vendorName,
            city,
            email
        })
        if(createVendor){
            const updateVendor={vendor:"true"}
            await User.updateOne({_id:_id},updateVendor)
            res.status(202)
            res.send(`create business`)
        }
    }catch(error){
        res.json({message:error})
    }
})

//vendor signin
const vendorSignin=asynchandler(async(req,res)=>{
    const{moblieNumber}=req.body
    const vendorIDCheak=await Vendor.findOne({moblieNumber})
    if(vendorIDCheak){
        res.status(200).json(vendorIDCheak)
    }
})

const OTPsend=()=>{
    const accountSid = 'ACda8b4dd7ab76fc7f3db1e3de8c4a8c6c'; // Your Account SID from www.twilio.com/console
    const authToken = 'fd6c905f4eb9bf1e927b37e8db96bdb8'; // Your Auth Token from www.twilio.com/console
    const client = new twilio(accountSid, authToken);
    client.messages
      .create({
        body: '38594',
        to: '+91 7598875705', 
        from: '+12345678901', 
      })
      .then((message) => console.log(message));
}

module.exports={signupUser,signinUser,userData,vendorData,vendorSignin,OTPsend}
const asynchandler=require('express-async-handler');
const rfq=require('../models/RfqData');
const Quot=require('../models/QuotData')
const User=require('../models/SignupModels');
const rfqPost=asynchandler(async(req,res)=>{
    const{service,amount,currency,description,status,color}=req.body.user
    const {clientName,email,phoneNumber}=req.body.Data

    if(!service || !amount || !currency || !description ){
        res.status(400);
        res.send(`please Enter the all the feilds${email}`)
        // throw new Error("please Enthe the all the feilds")
    }
        const createRfq=await rfq.create({
            service,
            amount,
            currency,
            description,
            clientName,
            email,
            phoneNumber,
            status,
            color
        })
    if(createRfq){
        res.status(201).json({
            _id:createRfq._id,
            servies:createRfq.clientName
        });
    }else{
        res.status(400);
        throw new Error("Failer to Create the user")
    }

})

//view all data

const viewRfq=asynchandler(async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            res.status(400)
            res.send(`email is not send ${email}`)
        }
        // let email={email:email}
        const getAll=await rfq.find({"email":email},{}).sort('-createdAt')
        // const getAll=await rfq.find({"email":"abimaniyam@gmail.com"},{})
        res.status(200).json(getAll)
    }catch(error){
        res.status(400).json({message:error.message})
    }
}
)

//get one data

const getOneRfq= asynchandler(async(req,res)=>{
    try{
        const user=await rfq.findById(req.params.id);
        res.status(200).json(user)
    }catch(error){
        res.status(404).json({message:error.message})
    }
})

//updata
const updateRfq=asynchandler(async(req,res)=>{
     let user=req.body;
    //  const editUser=new rfq(user)
    try{
        await rfq.updateOne({_id:req.params.id},user);
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

//view the Quottion

const viewQuot=asynchandler(async(req,res)=>{
    try{
        const {clientEmail}=req.body
        const getAll=await Quot.find({"clientEmail":clientEmail,status:"Progress"},{}).sort('-createdAt')
        // const getAll=await rfq.find({"email":"abimaniyam@gmail.com"},{})
        res.status(200).json(getAll)
    }catch(error){
        res.status(400).json({message:error.message})
    }
}
)


module.exports={rfqPost,viewRfq,getOneRfq,updateRfq,viewQuot}
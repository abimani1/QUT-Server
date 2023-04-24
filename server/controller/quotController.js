const asynchandler=require('express-async-handler');
const Quotation=require('../models/QuotData')
const rfq=require('../models/RfqData');


//Post the Quot
const postQuot=asynchandler(async(req,res)=>{
  const{service,vendorName,clientName,email,amount,Total_Quantity,clientEmail,clientMoblie,clientRfqID}=req.body.user
  const itemSet = req.body.item;
  if(!service|| !vendorName|| !clientName || !email){
    res.status(400)
    res.send(`enter the all the Filed`)
  }
  if(!itemSet){
    res.status(400)
    res.send(`add the itemset`)
  }
  const quot=await Quotation.create({
    service,
    vendorName,
    clientName,
    clientMoblie,
    clientEmail,
    amount,
    Total_Quantity,
    email,
    itemSet,
    clientRfqID
  })

  if(quot){
    res.status(201).json(quot)
  }

})

//View the Quot
const viewVendorQuot=asynchandler(async(req,res)=>{
  const{clientEmail}=req.body
  try{
    const getQuotData= await Quotation.find({"clientEmail":clientEmail,status:"Progress"},{}).sort('-createdAt')
    res.status(200).json(getQuotData)
  }catch(error){
    res.status(400).json({message:error})
  }
})

//View Rfq
const viewRfqVendor=asynchandler(async(req,res)=>{
  const{service}=req.body
  try{
      // const {email}=req.body
      const getAll=await rfq.find({"service":service},{}).sort('-createdAt')
      // const getAll=await rfq.find({"email":"abimaniyam@gmail.com"},{})
      res.status(200).json(getAll)
  }catch(error){
      res.status(400).json({message:error.message})
  }
}
)

//Accpet Quote
const AccpetQuote=asynchandler(async(req,res)=>{
  const {id,clientRfqID}=req.body
  try{
    const updatequot=await Quotation.updateOne({_id:id},{status:"Accpet"})
    const updatarfq =await rfq.updateOne({_id:clientRfqID},{QuoteID:id,status:"on Progress"})
    res.status(202).json(updatarfq)
  }catch(error){
    res.status(400).json({message:error})
  }
  
})
//Viwe only Accpet Quote
const ViweAccpetQuote=asynchandler(async(req,res)=>{
  const {categoriesService}=req.body
  try{
    const updatequot=await Quotation.find({status:"Accpet"},{})
    const updatarfq =await rfq.find({status:"on Progress",categoriesService:categoriesService},{})
    res.status(202).json(updatarfq)
  }catch(error){
    res.status(400).json({message:error})
  }
  
})


// quot Update
const updatequot=asynchandler(async(req,res)=>{
  let user=req.body;
    //  const editUser=new rfq(user)
    try{
        await Quotation.updateOne({_id:req.params.id},user);
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

const VendorQuot=asynchandler(async(req,res)=>{
  const{categoriesService,email}=req.body
  try{
    const getQuotData= await Quotation.find({service:categoriesService,email:email},{})
    res.status(200).json(getQuotData)
  }catch(error){
    res.status(400).json({message:error})
  }
})

//view Quot by Id
const QuotIdVendor= asynchandler(async(req,res)=>{
  try{
      const user=await Quotation.findById(req.params.id);
      res.status(200).json(user)
  }catch(error){
      res.status(404).json({message:error.message})
  }
})

module.exports={postQuot,viewRfqVendor,viewVendorQuot,updatequot,QuotIdVendor,VendorQuot,AccpetQuote,ViweAccpetQuote}
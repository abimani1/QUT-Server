const mongoose=require('mongoose')
var mydate1 = new Date()

const itemSchema=mongoose.Schema(
{
    item:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    
}
)
const quoteSchema=mongoose.Schema(
{
 service:{
    type:String,
    required:true
 },
 vendorName:{
    type:String,
    required:true
 },
 clientName:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true
 },
 clientMoblie:{
   type:Number,
   required:true
 },
 clientEmail:{
   type:String,
   required:true
 },
 itemSet:{
    type:[itemSchema]
 },
 amount:{
   type:String,
   required:true
 },
 Total_Quantity:{
   type:String,
   required:true
 },
 date:{
   type:Date,
   default:mydate1.toString()
 },
 status:{
  type:String,
  default:"Progress"
 },
 clientRfqID:{
  type:String,
  required:true
 }
},{timestamps:true}
)

const quot=mongoose.model("Quot",quoteSchema)

module.exports=quot;
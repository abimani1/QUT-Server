const mongoose=require('mongoose')

const vendorSchema=mongoose.Schema(
{
 vendorName:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true
 },
 moblieNumber:{
    type:String,
    required:true
 },
 address:{
   type:String,
   default:""
 },
 city:{
    type:String,
    required:true
 },
 categoriesService:{
    type:String,
    required:true
 },
 gstnumber:{
   type:String,
   default:""
 }
},{timestamps:true}
)

const quot=mongoose.model("vendor",vendorSchema)

module.exports=quot;
const mongoose=require('mongoose')

const rfqschema=mongoose.Schema(
    {
        service:{
            type:String,
            required:true
        },
        amount:{
            type:String,
            required:true
        },
        currency:{
            type:String,
            required:true
        },
        description:{
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
        phoneNumber:{
            type:Number,
            required:true
        },
        status:{
            type:String,
        },
        color:{
            type:String,
        },
        date:{
            type:Date,
            default:Date.now
        },
        QuoteID:{
            type:String,
            default:""
        }
    },{timestamps:true}
)

const Rfq=mongoose.model("RfqData",rfqschema);

module.exports=Rfq;


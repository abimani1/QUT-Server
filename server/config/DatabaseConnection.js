const mongoose=require('mongoose')

const connectDB= async()=>{
    try{
        const connect=await mongoose.connect(process.env.URL,{

            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB Connected`.cyan.underline);
    }catch(error){
        console.log(`Error: ${error.message}`.red.bold);
        process.exit();        
    }
}

module.exports=connectDB
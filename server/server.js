const colors=require('colors');
require('dotenv').config();
const express=require('express');
const app=express();
const connect=require('./config/DatabaseConnection');
const userRouter=require('./router/userRouter')
const bodyParser = require('body-parser');
const cors=require('cors')
const twilio = require('twilio');
const PORT=process.env.PORT;

app.use(cors());
//Database Connection
connect();

//middleware
app.use(express.json());

//routers
app.use("/api/user",userRouter);

//Host Port
app.listen(PORT,()=>{
    console.log(`${PORT} server is running`.yellow.bold)
})













// app.post('/',(req,res)=>{
//     let data=req.body;
//     res.send('Data Received:'+JSON.stringify(data))
// })
const express=require('express');
const cors=require('cors');
const app=express()
const dotenv=require('dotenv');

const connectDB = require('../utils/Db');
const cookieParser=require("cookie-parser")
const authrouter=require("../routers/AuthRoute")
dotenv.config();
const port=process.env.PORT || 5000;
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:[
     process.env.FRONTEND_URL,
     process.env.SECOND_URL,
     process.env.THIRD_URL
     




  ],
  credentials:true


}))
app.use("/auth",authrouter)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB()
})

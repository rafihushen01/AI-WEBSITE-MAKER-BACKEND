const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const mongourl=process.env.MONGO_URL;

const connectDB=async()=>{
  try {
      const connect=await mongoose.connect(mongourl)
        console.log(`MongoDB Connected Successfully`);
  } catch (error) {
       console.log("Error connecting to MongoDB:", error.message);
  }




}
module.exports=connectDB;

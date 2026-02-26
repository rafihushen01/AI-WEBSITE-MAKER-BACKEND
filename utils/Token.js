const jwt =require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const secretkey=process.env.JWT_SECRET_KEY
const gentoken=async (userId) => {
    try {
       return jwt.sign({userId},secretkey,{expiresIn:"3d"})
        
    } catch (error) {
        console.log(`gentoken error ${error}`)
        
    }
}
module.exports=gentoken
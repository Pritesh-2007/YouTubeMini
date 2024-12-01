const jwt =require("jsonwebtoken");
const User=require("../models/user");
require("dotenv").config();

const auth=async(req,res,next)=>{
    //will check is cookies present
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({error:'No token found, authorization denied '})
    }
    else
    {
        try 
        {
            const readtoken=jwt.verify(token,process.env.secret_key);
            req.user=await User.findById(readtoken.userId).select('-password')
            next();
        } 
        catch (error) 
        {
            return res.status(401).json({error:'Invalid token'}) 
        }
    }

}
module.exports=auth;
const jwt= require("jsonwebtoken");
const User=require("../models/user");
const bcrypt=require("bcrypt")
require("dotenv").config();
exports.signup=async(req,res)=>{
    try
    {
     const{userName,channelName,about,profilepic,password} =req.body;
    let Ispresent=await User.findOne({userName});
     if(Ispresent)
     {
      return res.status(400).json({
        success:false,
        msg:"User already exist"
       }); 
     }
     try {
        
        let hp;
        try {
            hp=await  bcrypt.hash(password,10);

        } catch (error) {
            return  res.status(500).json({
                success:false,
                msg:"Problem in Hashing!"
            })
        }
            const user=new User({userName,password:hp,about,profilepic,channelName})
            await user.save();
           return res.status(201).json({success:true,data:user,msg:"user created!"});
     } 
        catch (error) 
        {
        console.log(error)    
        }
    } 
    catch (error) {
       console.log(error); 
    }
}
exports.Login=async (req,res) => {
    try {
        const{userName,password}=req.body;
            let user=await User.findOne({userName})
            if(!user)
            {
                return res.status(404).json({
                    success:false,
                    msg:"User does not Exist"
                }) 
            }
           
            
            if(await bcrypt.compare(password,user.password))
            {
                    const token=jwt.sign({userId:user._id},process.env.secret_key)
                    res.cookie("token",token,{httpOnly:true})
                    return res.status(200).json({
                    success:true,
                    msg:"login succefull!",
                    token,
                    data:user
                }) 
            }
            else{
                return res.status(401).json({
                    success:false,
                    msg:"Invalid credentials"
                }) 
            }
        } 
              catch(error)
              {
                console.log(error);
              }
    } 
    exports.Logout=async(req,res)=>{
        res.clearCookie('token',{httpOnly:true}).json({msg:"Your Logout!"});

    }
const Comment=require("../models/comment");

exports.postcomment=async(req,res)=>{
 try 
 {
    const{video,message}=req.body;
    const comment=new Comment({user:req.user.id,video,message})
    await comment.save();
    res.status(201).json({success:true,msg:"commented successfully",data:comment})

 } catch (error) {
    res.status(500).json({success:false,msg:"Internall error",error:error.message})
 }   
}
exports.getcommentbyvideoId=async(req,res)=>{
    try {
        const{vid}=req.params;
        const comments=await Comment.find({video:vid}).populate('user','channelName profilepic userName createdAt');
        res.status(200).json({
            success:true,
            msg:"comments fetched!",
            data:comments
        })
    } catch (error) {
   res.status(500).json({success:false,msg:"Internall error"})
   
    }
    
}
exports.deletecomment=async(req,res)=>{
    try {
        const{cid}=req.params;
        const result=await Comment.findByIdAndDelete(cid);
        if(!result)
        {
            return res.status(400).json({
                success:false,
                msg:"comments not deleted!",
            })     
        }
       
        return res.status(200).json({
            success:true,
            msg:"comments deleted!",
        });
        } 
        catch (error) {
            return res.status(500).json({
                success:false,
                error:error.message
            })  
         }    
    }

const Video=require("../models/video");
const User=require("../models/user");
require("dotenv").config();

exports.videoupload=async (req,res)=>{
    try
    {
    const{user,title,description,thumbnail,videolink,videocategory}=req.body;    
    const uploadobj=new Video({user:req.user._id,title,description,thumbnail,videolink,videocategory})
    await uploadobj.save();
    res.status(201).json({success:true,msg:"video uploaded",data:uploadobj})
} 
    catch (error) {
        res.status(400).json({success:true,msg:"failed to upload"})

    }
}
exports.getallvideos=async(req,res)=>{
    try{
    const videos=await Video.find().populate('user','channelName profilepic userName createdAt about');
    res.status(200).json({success:true,msg:"video fetched",data:videos})
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({success:false,msg:"server error"})
        
    }

}
exports.getvideoById=async(req,res)=>{
    try {
        let id=req.params.id
        const videos=await Video.findById(id).populate('user','channelName profilepic userName createdAt');
        res.status(200).json({success:true,msg:"video fetched",data:videos})

    } catch (error) {
        res.status(500).json({msg:"something went wrong"})
    }
}
exports.getallvideosofchannel=async(req,res)=>{
    try {
        let{uid}=req.params;
        const videos=await Video.find({user:uid}).populate('user','channelName profilepic userName createdAt about');
        if(!videos)
        {
            return res.status(400).json({msg:"user videos not found"})
        }
        res.status(200).json({success:true,msg:"video fetched",data:videos})


    } catch (error) {
        res.status(500).json({msg:"something went wrong"})

    }
}
exports.userchannel=async(req,res)=>{
    try{
    const {id}=req.params;
   let user=await User.findById(id);
   if(user)
    {
      return  res.status(200).json({
            success:true,
            msg:"user Details",
            data:user
        })
    } 
    res.status(400).json({
        success:false,
        msg:"user not found",
    })
}
catch(error)
{
    res.status(500).json({
        success:false,
        error:error.message
       
    })
}
}
exports.videorecommend=async (req,res) => {
    try {
        // const pipeline = [ { $sample: { size: 6 } },
        //     // Randomly select 5 documents
        //      { $limit: 6 } 
        //     // Limit the result to 5 documents
        //      ];
        //      const results = await Video.aggregate(pipeline);
              const pipeline = [
                { $sample: { size: 5 } }, // Randomly select 5 documents
                { $limit: 5 }, // Limit the result to 5 documents
                {
                  $lookup: {
                    from: 'users', // The collection to join
                    localField: 'user', // Field from the Video collection
                    foreignField: '_id', // Field from the User collection
                    as: 'userData' // Alias for the joined data
                  }
                },
                {
                  $unwind: '$userData' // Unwind the userData array to deconstruct it
                }
              ];
              
              const results = await Video.aggregate(pipeline);
              console.log(results);
              
             return res.status(200).json({
                success:true,
                msg:" video recommendation",
                data:results
             });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
        
    }
    
}  
exports.updatelike=async (req, res) => {
    try {
      const videoId = req.params.id;
      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { like: 1 } },
        { new: true }
      );
  
      if (!updatedVideo) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }
  
      res.status(200).json({ success: true, data: updatedVideo });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}
exports.dislike=async (req, res) => {
    try {
      const videoId = req.params.id;
      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { dislike: 1 } },
        { new: true }
      );
  
      if (!updatedVideo) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }
  
      res.status(200).json({ success: true, data: updatedVideo });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}
   
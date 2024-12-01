const mongoose=require("mongoose");

const commentShema=new mongoose.Schema(
    {
        user:{
            require:true ,
            ref:'user',
            type:mongoose.Schema.Types.ObjectId,
           }, 
            video:{
                require:true ,
                ref:'video',
                type:mongoose.Schema.Types.ObjectId,
               }, 
            
           message:{
              require:true ,
              type:String,
             },    
    },{timestamps:true})
    module.exports=mongoose.model('comment',commentShema);
const mongoose=require("mongoose");

const userShema=new mongoose.Schema(
    {
     userName:{
      require:true ,
      type:String,
      unique:true 
     }, 
  
     password:{
        require:true ,
        type:String,
       },    
     channelName:{
        require:true ,
        type:String,
       },   
       profilepic:{
          require:true ,
          type:String,
         }  ,   
         about:{
            require:true ,
            type:String,
           }   

    },{timestamps:true})
    module.exports=mongoose.model('user',userShema);
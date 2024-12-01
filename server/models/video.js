const mongoose=require("mongoose");

const videoShema=new mongoose.Schema(
    {
     user:{
      require:true ,
      ref:'user',
      type:mongoose.Schema.Types.ObjectId,
     }, 
  
     title:{
        require:true ,
        type:String,
       },    
     description:{
        type:String,
       },   
       videocategory:{
          type:String,
          default:"All"
         }  , 
         thumbnail:{
            require:true ,
            type:String,
           },
           videolink:{
            require:true ,
            type:String,
           },
         like:{
            type:Number,
            default:0
           }  ,
           dislike:{
            type:Number,
            default:0
           }   

    },{timestamps:true})
    module.exports=mongoose.model('video',videoShema);
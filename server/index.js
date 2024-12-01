const express=require("express");
const DBConnect = require("./config/databse");
const cookieParser=require("cookie-parser");
const app=express();
const cors = require("cors");


app.listen(4000,()=>{
    console.log("Server Listenting");
});
DBConnect();
app.get("/",(req,res)=>{
    res.send("hello form server");
}
)

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
// app.options('/auth/login', cors({
//     origin: 'http://localhost:5173',
//     credentials: true
//   }));
  
//middlewear
const AuthRoutes=require("./routes/user");
const Videoroutes=require("./routes/video");
const commentroutes=require("./routes/comment");

const router=express.Router();
app.use(express.json());
app.use(cookieParser());
app.use('/auth',AuthRoutes);
app.use('/videoapi',Videoroutes);
app.use('/commentapi',commentroutes);

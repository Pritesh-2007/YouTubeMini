const express=require("express");
const router=express.Router();


const { signup, Login, Logout, userchannel } = require("../controller/user");

router.post("/signup",signup);
router.post("/login",Login);
router.post("/logout",Logout)
module.exports=router;

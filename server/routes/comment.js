const express=require("express");
const router=express.Router();
const auth=require("../middlewear/authentication");
const { postcomment, getcommentbyvideoId, deletecomment } = require("../controller/comment");

router.post("/addcomment",auth,postcomment)
router.get("/commentBYvid/:vid",getcommentbyvideoId)
router.delete("/deletecomment/:cid",auth,deletecomment)
module.exports=router;

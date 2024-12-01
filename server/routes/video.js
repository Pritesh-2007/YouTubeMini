const express=require("express");
const videocontroler = require("../controller/video");
const auth=require("../middlewear/authentication");
const router=express.Router();

router.post("/uploadvideo",auth,videocontroler.videoupload);
router.get("/getvideos",videocontroler.getallvideos);
router.get("/getvideobyid/:id",videocontroler.getvideoById);
router.get("/getvideoofchannel/:uid",videocontroler.getallvideosofchannel);
router.get('/userchannel/:id',videocontroler.userchannel); 
router.get('/videorecommend',videocontroler.videorecommend)
router.post('/updatelike/:id',auth,videocontroler.updatelike)
router.post('/dislike/:id',auth,videocontroler.dislike);
module.exports=router;
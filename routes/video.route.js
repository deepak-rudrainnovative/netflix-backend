const express=require('express');
const router=express.Router();
const videoController=require('../controllers/video.controller')

//get video data by video Id
router.get('/:id',videoController.getVideoById);
//get all videos list 
router.get('/videos/all',videoController.getAllVideos)


module.exports=router;
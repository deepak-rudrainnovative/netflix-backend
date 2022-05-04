const videos=require('../services/videos')
const fs = require('fs');
const path=require('path');

//get video stream data by video Id
module.exports.getVideoById=async(req,res,next)=>{
    try {
        const videoPath =path.resolve(__dirname, "../public/assets/"+videos[req.params.id-1].filename);
        const videoStat = fs.statSync(videoPath);
        const fileSize = videoStat.size;
        const videoRange = req.headers.range;
        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize-1;
            const chunksize = (end-start) + 1;
            const file = fs.createReadStream(videoPath, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {
        next(error)
    }
}

//get all videos list
module.exports.getAllVideos=async(req,res,next)=>{
    try {
        res.status(200).send(videos);
    } catch (error) {
        next(error)
    }
}


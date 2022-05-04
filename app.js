const express=require('express');
const cors=require('cors');
require('./services/connection')
const userRoute=require('./routes/user.route');
const videoRoute=require('./routes/video.route');
//initializations
const app=express();
const PORT=process.env.PORT||5000;
//setup middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//allow cors for any url 
app.use(cors());
//route setup
app.use('/v1/api/user',userRoute);
app.use('/v1/api/video',videoRoute);

//server listen
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
});
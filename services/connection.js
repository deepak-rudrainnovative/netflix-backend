const mongoose=require('mongoose')
const config=require('config');

const DB_URL=config.get('DB_URL');

//connect mongodb
module.exports=mongoose.connect(DB_URL).then((conn)=>{
    console.log('Database Connected')
}).catch((err)=>{
    console.error('Error :'+err)
})
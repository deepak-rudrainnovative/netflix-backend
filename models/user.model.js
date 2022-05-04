const mongoose=require('mongoose');
const config=require('config');
const jwt=require('jsonwebtoken');

const {Schema,model}=mongoose;
//user schema
const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:4
    }
},{timestamps:true});

//function to generate token
userSchema.methods.generateToken=function (){
    let token=jwt.sign({_id:this._id,email:this.email},config.get('JWT_PRIVATE_KEY'));
    return token;
}

const UserModel=model('user',userSchema);


module.exports=UserModel
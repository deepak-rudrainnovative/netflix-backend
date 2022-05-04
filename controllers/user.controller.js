
const UserModel = require("../models/user.model")
const messages=require('../messages.json');
const userService = require("../services/user.service");

//get user by user ID
module.exports.getUserByID=async(req,res,next)=>{
    try {
        const user=await UserModel.findOne({_id:req.params.id});
        if(!user){
            return res.status(404).send(messages.COMMON_API.USER_NOT_FOUND)
        }
        let token=user.generateToken();
        res.setHeader("access-control-expose-headers", "x-auth-token").header('x-auth-token',token).send(user);
    } catch (error) {
        next(error)
    }
}
//signup user
module.exports.signUpUser=async (req,res,next)=>{
    try {
        const {fullName,email,password}=req.body;
        const oldUser=await UserModel.findOne({email})
        if(oldUser){
            return res.status(400).send(messages.SIGNUP_API.ALREADY_SIGNUP)
        }
        const hashPass=await userService.hashPassword(password);
        const user=new UserModel({fullName,email,password:hashPass});
        let token=user.generateToken();
        const result= await user.save();
        if(result){
            return res.setHeader("access-control-expose-headers", "x-auth-token").header('x-auth-token',token).send(result);
        }
    } catch (error) {
        next(error)
    }
}
//login user
module.exports.loginUser=async(req,res,next)=>{
    try {
        const {email,password}=req.body

        const user=await UserModel.findOne({email});
        if(!user)
         return res.status(404).send(messages.COMMON_API.USER_NOT_FOUND);

        const decodedPassword=await userService.decodedPassword(password,user.password);
        if(!decodedPassword)
         return res.status(400).send(messages.LOGIN_API.PASSWORD_MISMATCH);
        
        const token=user.generateToken();

        res.setHeader("access-control-expose-headers", "x-auth-token").header('x-auth-token',token).send(user);

       } catch (error) {
        next(error)
    }
}


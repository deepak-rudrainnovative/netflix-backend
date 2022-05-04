const express=require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const userValidation=require('../validations/user.validate')
const router=express.Router();

//get user by user Id
router.get('/:id',auth,userController.getUserByID);
//signup user
router.post('/signup',userValidation.userValidateSignUp,userController.signUpUser);
//login user
router.post('/login',userValidation.userValidateLogin,userController.loginUser);

module.exports=router;
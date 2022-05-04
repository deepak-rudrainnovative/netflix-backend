const bcrypt=require('bcrypt');


//compare password to hash password
module.exports.decodedPassword=async(password,hashPassowrd)=>{
       const decodedPassword=await bcrypt.compare(password,hashPassowrd);
       return decodedPassword;
}
//convert password to hash password
module.exports.hashPassword=async(password)=>{
    const salt=await bcrypt.genSalt();
    const hashedPassword=await bcrypt.hashSync(password,salt);
    return hashedPassword;
}
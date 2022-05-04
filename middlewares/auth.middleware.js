const messages=require('../messages.json')

//validate header have token or not
module.exports =async(req, res, next) => {
  try {
    const token =req.header("x-auth-token");
    if (!token) return res.status(401).send(messages.COMMON_API.UNAUTHORIZED_USER);
    next();
  } catch (err) {
    next(err);
  }
};

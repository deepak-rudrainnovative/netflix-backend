
//any error from server send to client
module.exports =async (error, req, res, next) => {

  return res.status(500).send({ message: error.message,status:500 });
};

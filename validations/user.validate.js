const Joi = require("joi");

//validate fields before signup
exports.userValidateSignUp =async (req, res, next) => {
  const userSchema = Joi.object({
    fullName: Joi.string().min(4).required().label("Full Name"),
    email: Joi.string().required().label("Email Address"),
    password: Joi.string().required().label("Password"),
  });

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  } else {
    next();
  }
};
//validate fields before login
exports.userValidateLogin =async (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().required().label("Email Address"),
    password: Joi.string().required().label("Password"),
  });

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  } else {
    next();
  }
};

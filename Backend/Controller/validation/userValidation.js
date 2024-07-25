const Joi = require('joi');
// user schema 
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// schema validation
const validateSchema = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send('Invalid input');
  }

  next();
};

module.exports = validateSchema;

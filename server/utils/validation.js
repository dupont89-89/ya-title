const Joi = require("joi");

const validateUser = (data) => {
  const schema = Joi.object({
    // firstName: Joi.string().required(),
    // lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { validateUser };

const joi = require("joi");

module.exports.validateuser = (requestParams) => {
  let joiSchema = joi.object({
    phone: joi.string().required(),
    password: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};
module.exports.registerUser = (requestParams) => {
  let joiSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().optional().allow(null),
    password: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};
module.exports.getUser = (requestParams) => {
  let joiSchema = joi.object({
    userRef: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.loginUser = (requestParams) => {
  let joiSchema = joi.object({
    UserId: joi.number().required(),
  });
  return joiSchema.validate(requestParams);
};
module.exports.logoutUser = (requestParams) => {
  let joiSchema = joi.object({
    userId: joi.number().required(),
    AuthToken: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

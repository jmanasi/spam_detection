const joi = require("joi");

//Contact
module.exports.addContact = (requestParams) => {
  let joiSchema = joi.object({
    userId: joi.number().optional().allow(0),
    contactName: joi.string().required(),
    phone: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.getAllContacts = (requestParams) => {
  let joiSchema = joi.object({
    pageNumber: joi.number().optional().allow(0),
    pageSize: joi.number().optional().allow(0),
  });
  return joiSchema.validate(requestParams);
};

//Spam
module.exports.markContactAsSpam = (requestParams) => {
  let joiSchema = joi.object({
    phone: joi.string().required(),
  });
  return joiSchema.validate(requestParams);
};

module.exports.getAllSpamContacts = (requestParams) => {
  let joiSchema = joi.object({
    pageNumber: joi.number().optional().allow(0),
    pageSize: joi.number().optional().allow(0),
  });
  return joiSchema.validate(requestParams);
};
module.exports.searchContact = (requestParams) => {
  let joiSchema = joi.object({
    searchContactName: joi.string().optional().allow(null),
    searchPhone: joi.string().optional().allow(null),
  });
  return joiSchema.validate(requestParams);
};

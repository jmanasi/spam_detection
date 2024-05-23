const dbconfig = require("../config/database");
const errorModel = require("../models/error");
const constant = require("../utils/constant");

const contactService = {
  addContact: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("addContact() :: DB :: Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL add_contact(
          :userId,
          :contactName,
          :phone
          )`,
        {
          userId: resolvedResult.userId,
          contactName: resolvedResult.contactName,
          phone: resolvedResult.phone,
        }
      );
      return rows[0][0][0] ? rows[0][0][0] : null;
    } catch (err) {
      logger.logInfo(`addContact() :: Error :: ${JSON.stringify(err)}`);

      let errorCode = constant.errorCode.dbError;
      let errorMessage = constant.errorMessage.dbError;
      if (
        err.sqlState &&
        err.sqlState == constant.errorCode.contactNamePhoneExists
      ) {
        errorCode = constant.errorCode.contactNamePhoneExists;
        errorMessage = constant.errorMessage.contactNamePhoneExists;
      } else {
        errorCode = constant.errorCode.dbError;
        errorMessage = constant.errorMessage.dbError;
      }

      functionContext.error = new errorModel.ErrorModel(
        errorMessage,
        errorCode
      );

      throw functionContext.error;
    }
  },
  getAllContacts: async (functionContext, resolvedResult, FileUrl) => {
    let logger = functionContext.logger;

    logger.logInfo("getAllContacts() :: DB :: Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL get_all_contacts(
        
        )`
      );

      logger.logInfo(
        `getAllContacts() :: DB :: Returned Result :: ${JSON.stringify(
          rows[0][0]
        )}`
      );

      return rows[0][0] ? rows[0][0] : null;
    } catch (err) {
      logger.logInfo(`getAllContacts() :: Error :: ${JSON.stringify(err)}`);

      let errorCode = constant.errorCode.dbError;
      let errorMessage = constant.errorMessage.dbError;

      errorCode = constant.errorCode.dbError;
      errorMessage = constant.errorMessage.dbError;

      functionContext.error = new errorModel.ErrorModel(
        errorMessage,
        errorCode
      );

      throw functionContext.error;
    }
  },
};

module.exports = contactService;

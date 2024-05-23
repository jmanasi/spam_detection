const dbconfig = require("../config/database");
const errorModel = require("../models/error");
const constant = require("../utils/constant");

const spamService = {
  markContactAsSpam: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("markContactAsSpam() :: DB :: Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL mark_contact_as_spam(
          :phone
          )`,
        {
          phone: resolvedResult.phone,
        }
      );
      return rows[0][0][0] ? rows[0][0][0] : null;
    } catch (err) {
      logger.logInfo(`markContactAsSpam() :: Error :: ${JSON.stringify(err)}`);

      let errorCode = constant.errorCode.dbError;
      let errorMessage = constant.errorMessage.dbError;
      if (err.sqlState && err.sqlState == constant.errorCode.noContact) {
        errorCode = constant.errorCode.noContact;
        errorMessage = constant.errorMessage.noContact;
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
  getAllSpamContacts: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("getAllSpamContacts() :: DB :: Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL get_all_spam_contacts(
 
        )`
      );

      logger.logInfo(
        `getAllSpamContacts() :: DB :: Returned Result :: ${JSON.stringify(
          rows[0][0]
        )}`
      );

      return rows[0][0] ? rows[0][0] : null;
    } catch (err) {
      logger.logInfo(`getAllSpamContacts() :: Error :: ${JSON.stringify(err)}`);

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
  searchContactByName: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("searchContactByName() :: DB :: Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL search_contact_by_name(
          :searchQuery
          )`,
        {
          searchQuery: resolvedResult.searchContactName,
        }
      );
      return rows[0][0] ? rows[0][0] : null;
    } catch (err) {
      logger.logInfo(
        `searchContactByName() :: Error :: ${JSON.stringify(err)}`
      );

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
  searchContactByPhone: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("searchContactByPhone() :: DB :: Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL search_contact_by_phone(
          :searchQuery
          )`,
        {
          searchQuery: resolvedResult.searchPhone,
        }
      );
      return rows[0][0] ? rows[0][0] : null;
    } catch (err) {
      logger.logInfo(
        `searchContactByPhone() :: Error :: ${JSON.stringify(err)}`
      );

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

module.exports = spamService;

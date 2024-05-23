const dbconfig = require("../config/database");
const errorModel = require("../models/error");
const constant = require("../utils/constant");

const userService = {
  validateUser: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("validateUserDB() Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL validate_user(:phone, :password)`,
        {
          phone: resolvedResult.phone,
          password: resolvedResult.password,
        }
      );

      return rows[0][0][0] ? rows[0][0][0] : null;
    } catch (errValidateUserDB) {
      logger.logInfo(
        `validateUserDB() :: Error :: ${JSON.stringify(errValidateUserDB)}`
      );
      let errorCode = null;
      let errorMessage = null;
      if (
        errValidateUserDB.sqlState &&
        errValidateUserDB.sqlState == constant.errorCode.invalidUser
      ) {
        errorCode = constant.errorCode.invalidUser;
        errorMessage = constant.errorMessage.invalidUser;
      } else if (
        errValidateUserDB.sqlState &&
        errValidateUserDB.sqlState == constant.errorCode.userDoesNotExist
      ) {
        errorCode = constant.errorCode.userDoesNotExist;
        errorMessage = constant.errorMessage.userDoesNotExist;
      } else if (
        errValidateUserDB.sqlState &&
        errValidateUserDB.sqlState == constant.errorCode.inactiveUser
      ) {
        errorCode = constant.errorCode.inactiveUser;
        errorMessage = constant.errorMessage.inactiveUser;
      } else {
        errorCode = constant.errorCode.applicationError;
        errorMessage = constant.errorMessage.applicationError;
      }
      functionContext.error = new errorModel.ErrorModel(
        errorMessage,
        errorCode
      );
      throw functionContext.error;
    }
  },
  registerUser: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("registerUserDB() Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL user_register(:name, :phone, :email, :password)`,
        {
          name: resolvedResult.name,
          phone: resolvedResult.phone,
          email: resolvedResult.email,
          password: resolvedResult.password,
        }
      );

      return rows[0][0][0] ? rows[0][0][0] : null;
    } catch (errregisterUserDB) {
      logger.logInfo(
        `registerUserDB() :: Error :: ${JSON.stringify(errregisterUserDB)}`
      );
      let errorCode = null;
      let errorMessage = null;
      if (
        errregisterUserDB.sqlState &&
        errregisterUserDB.sqlState == constant.errorCode.phoneExists
      ) {
        errorCode = constant.errorCode.phoneExists;
        errorMessage = constant.errorMessage.phoneExists;
      } else if (
        errregisterUserDB.sqlState &&
        errregisterUserDB.sqlState == constant.errorCode.emailExists
      ) {
        errorCode = constant.errorCode.emailExists;
        errorMessage = constant.errorMessage.emailExists;
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
  getUser: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("getUserDB() Invoked !");

    try {
      let rows = await dbconfig.knex.raw(`CALL get_user(:userRef)`, {
        userRef: resolvedResult.userRef,
      });

      return rows[0][0][0] ? rows[0][0][0] : null;
    } catch (errregisterUserDB) {
      logger.logInfo(
        `getUserDB() :: Error :: ${JSON.stringify(errregisterUserDB)}`
      );
      let errorCode = null;
      let errorMessage = null;
      if (
        errregisterUserDB.sqlState &&
        errregisterUserDB.sqlState == constant.errorCode.userDoesNotExist
      ) {
        errorCode = constant.errorCode.userDoesNotExist;
        errorMessage = constant.errorMessage.userDoesNotExist;
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
};

module.exports = userService;

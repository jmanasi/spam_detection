const dbconfig = require("../config/database");
const errorModel = require("../models/error");
const constant = require("../utils/constant");

const authService = {
  loginUser: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("loginUserDB() Invoked !");

    try {
      let rows = await dbconfig.knex.raw(`CALL user_login(:UserId, :Token)`, {
        UserId: resolvedResult.UserId,
        Token: resolvedResult.Token,
      });
      return {
        logindata: rows[0][0][0] ? rows[0][0][0] : null,
        userData: rows[0][1][0] ? rows[0][1][0] : null,
      };
    } catch (errLoginUser) {
      logger.logInfo(
        `loginUserDB() :: Error :: ${JSON.stringify(errLoginUser)}`
      );

      let errorCode = constant.errorCode.dbError;
      let errorMessage = constant.errorMessage.dbError;

      functionContext.error = new errorModel.ErrorModel(
        errorMessage,
        errorCode
      );
      throw functionContext.error;
    }
  },
  logoutUser: async (functionContext, resolvedResult) => {
    let logger = functionContext.logger;

    logger.logInfo("logoutUserDB() Invoked !");

    try {
      let rows = await dbconfig.knex.raw(
        `CALL user_logout(:UserId,:AuthToken)`,
        {
          UserId: resolvedResult.userId,
          AuthToken: resolvedResult.AuthToken,
        }
      );

      return {
        logoutdata: rows[0][0][0] ? rows[0][0][0] : null,
      };
    } catch (errLogoutUser) {
      logger.logInfo(
        `logoutUserDB() :: Error :: ${JSON.stringify(errLogoutUser)}`
      );

      let errorCode = constant.errorCode.dbError;
      let errorMessage = constant.errorMessage.dbError;

      functionContext.error = new errorModel.ErrorModel(
        errorMessage,
        errorCode
      );
      throw functionContext.error;
    }
  },
};

module.exports = authService;

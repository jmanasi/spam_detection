const applib = require("applib");
const momentTimezone = require("moment-timezone");

const { errorMessage, errorCode } = require("../utils/constant");
const { response, generateToken } = require("../utils/helper");
const { ErrorModel } = require("../models/error");

const requestModel = require("../models/request");
const responseModel = require("../models/response");
const authDB = require("../services/auth");

const validate = require("../utils/validate");

const authController = {
  login: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`loginUser() invoked!!`);

    let functionContext = {
      error: null,
      res: res,
      logger: logger,
      currentTs: momentTimezone
        .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss "),
    };

    const responseObj = {
      name: "loginUser",
      model: new responseModel.loginUser(),
    };

    let loginUserRequest = new requestModel.loginUser(req);

    logger.logInfo(`loginUser() :: Request Object :: ${loginUserRequest}`);

    let validateRequest = validate.loginUser(loginUserRequest);

    if (validateRequest.error) {
      functionContext.error = new ErrorModel(
        validateRequest.error.details[0]["message"],
        errorCode.invalidRequest
      );
      logger.logInfo(
        `loginUser() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }

    const token = generateToken(loginUserRequest.UserId);
    loginUserRequest = {
      ...loginUserRequest,
      Token: token,
    };
    try {
      let loginUserDBResult = await authDB.loginUser(
        functionContext,
        loginUserRequest
      );

      response(functionContext, responseObj, loginUserDBResult);
    } catch (errLoginUser) {
      if (!errLoginUser.ErrorMessage && !errLoginUser.ErrorCode) {
        logger.logInfo(`validateUserDBResult :: Error :: ${errLoginUser}`);
        functionContext.error = new ErrorModel(
          errorMessage.applicationError,
          errorCode.applicationError
        );
      }
      logger.logInfo(
        `validateUserDBResult :: Error :: ${JSON.stringify(errLoginUser)}`
      );
      response(functionContext, responseObj, null);
    }
  },
  logout: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`logoutUser() invoked!!`);

    let functionContext = {
      error: null,
      res: res,
      logger: logger,
      currentTs: momentTimezone
        .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss "),
    };

    const responseObj = {
      name: "logoutUser",
      model: new responseModel.logoutUser(),
    };

    let logoutUserRequest = new requestModel.logoutUser(req);

    logger.logInfo(`logoutUser() :: Request Object :: ${logoutUserRequest}`);

    let validateRequest = validate.logoutUser(logoutUserRequest);

    if (validateRequest.error) {
      functionContext.error = new ErrorModel(
        validateRequest.error.details[0]["message"],
        errorCode.invalidRequest
      );
      logger.logInfo(
        `logoutUser() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }

    try {
      let logoutUserDBResult = await authDB.logoutUser(
        functionContext,
        logoutUserRequest
      );
      response(functionContext, responseObj, logoutUserDBResult);
    } catch (errLogoutUser) {
      if (!errLogoutUser.ErrorMessage && !errLogoutUser.ErrorCode) {
        logger.logInfo(`logoutUserDBResult :: Error :: ${errLogoutUser}`);
        functionContext.error = new ErrorModel(
          errorMessage.applicationError,
          errorCode.applicationError
        );
      }
      logger.logInfo(
        `logoutUserDBResult :: Error :: ${JSON.stringify(errLogoutUser)}`
      );
      response(functionContext, responseObj, null);
    }
  },
};

module.exports = authController;

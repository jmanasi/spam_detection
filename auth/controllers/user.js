// const applib = require("applib");
const applib = require("../../applib");
const momentTimezone = require("moment-timezone");

const { response } = require("../utils/helper");

const requestModel = require("../models/request");
const responseModel = require("../models/response");
const userDB = require("../services/user");

const validate = require("../utils/validate");

const userController = {
  validateUser: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`validateUser() invoked!!`);

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
      name: "validateUser",
      model: new responseModel.validateUser(),
    };

    let validateUserRequest = new requestModel.validateUser(req);

    logger.logInfo(
      `validateUser() :: Request Object :: ${validateUserRequest}`
    );

    let validateRequest = validate.validateuser(validateUserRequest);

    if (validateRequest.error) {
      functionContext.error = new errorModel.ErrorModel(
        validateRequest.error.details[0]["message"],
        constant.ErrorCode.Invalid_Request
      );
      logger.logInfo(
        `validateUser() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }
    try {
      let validateUserDBResult = await userDB.validateUser(
        functionContext,
        validateUserRequest
      );

      response(functionContext, responseObj, validateUserDBResult);
    } catch (errValidateUser) {
      if (!errValidateUser.ErrorMessage && !errValidateUser.ErrorCode) {
        logger.logInfo(`validateUserDBResult :: Error :: ${errValidateUser}`);
        functionContext.error = new errorModel.ErrorModel(
          constant.ErrorMessage.ApplicationError,
          constant.ErrorCode.ApplicationError
        );
      }
      logger.logInfo(
        `validateUserDBResult :: Error :: ${JSON.stringify(errValidateUser)}`
      );
      response(functionContext, responseObj, null);
    }
  },
  registerUser: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`registerUser() invoked!!`);

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
      name: "registerUser",
      model: new responseModel.registerUser(),
    };

    let registerUserRequest = new requestModel.registerUser(req);

    logger.logInfo(
      `registerUser() :: Request Object :: ${registerUserRequest}`
    );

    let validateRequest = validate.registerUser(registerUserRequest);

    if (validateRequest.error) {
      functionContext.error = new errorModel.ErrorModel(
        validateRequest.error.details[0]["message"],
        constant.ErrorCode.Invalid_Request
      );
      logger.logInfo(
        `registerUser() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }
    try {
      let registerUserDBResult = await userDB.registerUser(
        functionContext,
        registerUserRequest
      );

      response(functionContext, responseObj, registerUserDBResult);
    } catch (errregisterUser) {
      if (!errregisterUser.ErrorMessage && !errregisterUser.ErrorCode) {
        logger.logInfo(`registerUserDBResult :: Error :: ${errregisterUser}`);
        functionContext.error = new errorModel.ErrorModel(
          constant.ErrorMessage.ApplicationError,
          constant.ErrorCode.ApplicationError
        );
      }
      logger.logInfo(
        `registerUserDBResult :: Error :: ${JSON.stringify(errregisterUser)}`
      );
      response(functionContext, responseObj, null);
    }
  },
  getUser: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`getUser() invoked!!`);

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
      name: "getUser",
      model: new responseModel.getUser(),
    };

    let getUserRequest = new requestModel.getUser(req);

    logger.logInfo(`getUser() :: Request Object :: ${getUserRequest}`);

    let validateRequest = validate.getUser(getUserRequest);

    if (validateRequest.error) {
      functionContext.error = new errorModel.ErrorModel(
        validateRequest.error.details[0]["message"],
        constant.ErrorCode.Invalid_Request
      );
      logger.logInfo(
        `getUser() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }
    try {
      let getUserDBResult = await userDB.getUser(
        functionContext,
        getUserRequest
      );

      response(functionContext, responseObj, getUserDBResult);
    } catch (errGetUser) {
      if (!errGetUser.ErrorMessage && !errGetUser.ErrorCode) {
        logger.logInfo(`getUserDBResult :: Error :: ${errGetUser}`);
        functionContext.error = new errorModel.ErrorModel(
          constant.ErrorMessage.ApplicationError,
          constant.ErrorCode.ApplicationError
        );
      }
      logger.logInfo(
        `getUserDBResult :: Error :: ${JSON.stringify(errGetUser)}`
      );
      response(functionContext, responseObj, null);
    }
  },
};

module.exports = userController;

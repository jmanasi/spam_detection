// const applib = require("applib");
const applib = require("../../applib");
const momentTimezone = require("moment-timezone");
const { errorMessage, errorCode } = require("../utils/constant");
const { response, generateToken } = require("../utils/helper");
const { ErrorModel } = require("../models/error");
const requestModel = require("../models/request");
const responseModel = require("../models/response");
const spamService = require("../services/spam");
const validate = require("../utils/validate");
// require("dotenv").config({ path: __dirname + "/.env" });
require("dotenv").config();

const teamController = {
  getAllSpamContacts: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`getAllSpamContacts() invoked!!`);

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
      name: "getAllSpamContacts",
      model: new responseModel.getAllSpamContacts(),
    };

    let getAllSpamContactsRequest = new requestModel.getAllSpamContacts(req);

    logger.logInfo(
      `getAllSpamContacts() :: Request Object :: ${getAllSpamContactsRequest}`
    );

    let validateRequest = validate.getAllSpamContacts(
      getAllSpamContactsRequest
    );
    if (validateRequest.error) {
      functionContext.error = new ErrorModel(
        validateRequest.error.details[0]["message"],
        errorCode.invalidRequest
      );
      logger.logInfo(
        `getAllSpamContacts() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }

    try {
      let getAllSpamContactsDBResult = await spamService.getAllSpamContacts(
        functionContext,
        getAllSpamContactsRequest
      );
      const pageNumber = parseInt(getAllSpamContactsRequest?.pageNumber) || 1; // Get the current page number from the query parameters
      const startIndex =
        (pageNumber - 1) * parseInt(getAllSpamContactsRequest?.pageSize);
      const endIndex =
        startIndex + parseInt(getAllSpamContactsRequest?.pageSize);

      if (getAllSpamContactsRequest?.pageNumber > 0) {
        response(
          functionContext,
          responseObj,
          getAllSpamContactsDBResult?.slice(startIndex, endIndex)
        );
      } else {
        response(functionContext, responseObj, getAllSpamContactsDBResult);
      }
    } catch (errGetAllSpamContacts) {
      if (
        !errGetAllSpamContacts.ErrorMessage &&
        !errGetAllSpamContacts.ErrorCode
      ) {
        logger.logInfo(
          `getAllSpamContactsDBResult :: Error :: ${errGetAllSpamContacts}`
        );
        functionContext.error = new ErrorModel(
          errorMessage.applicationError,
          errorCode.applicationError
        );
      }
      logger.logInfo(
        `getAllSpamContactsDBResult :: Error :: ${JSON.stringify(
          errGetAllSpamContacts
        )}`
      );
      response(functionContext, responseObj, null);
    }
  },
  markContactAsSpam: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`markContactAsSpam() invoked!!`);

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
      name: "markContactAsSpam",
      model: new responseModel.markContactAsSpam(),
    };

    let markContactAsSpamRequest = new requestModel.markContactAsSpam(req);

    logger.logInfo(
      `markContactAsSpam() :: Request Object :: ${markContactAsSpamRequest}`
    );

    let validateRequest = validate.markContactAsSpam(markContactAsSpamRequest);
    if (validateRequest.error) {
      functionContext.error = new ErrorModel(
        validateRequest.error.details[0]["message"],
        errorCode.invalidRequest
      );
      logger.logInfo(
        `markContactAsSpam() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }

    try {
      let markContactAsSpamDBResult = await spamService.markContactAsSpam(
        functionContext,
        markContactAsSpamRequest
      );

      response(functionContext, responseObj, markContactAsSpamDBResult);
    } catch (errMarkContactAsSpam) {
      if (
        !errMarkContactAsSpam.ErrorMessage &&
        !errMarkContactAsSpam.ErrorCode
      ) {
        logger.logInfo(
          `markContactAsSpamDBResult :: Error :: ${errMarkContactAsSpam}`
        );
        functionContext.error = new ErrorModel(
          errorMessage.applicationError,
          errorCode.applicationError
        );
      }
      logger.logInfo(
        `markContactAsSpamDBResult :: Error :: ${JSON.stringify(
          errMarkContactAsSpam
        )}`
      );
      response(functionContext, responseObj, null);
    }
  },
  searchContact: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`searchContact() invoked!!`);

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
      name: "searchContact",
      model: new responseModel.searchContact(),
    };

    let searchContactRequest = new requestModel.searchContact(req);

    logger.logInfo(
      `searchContact() :: Request Object :: ${searchContactRequest}`
    );

    let validateRequest = validate.searchContact(searchContactRequest);
    if (validateRequest.error) {
      functionContext.error = new ErrorModel(
        validateRequest.error.details[0]["message"],
        errorCode.invalidRequest
      );
      logger.logInfo(
        `searchContact() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }

    try {
      let searchContactDBResult;
      if (
        searchContactRequest?.searchContactName != null &&
        searchContactRequest?.searchPhone == null
      ) {
        searchContactDBResult = await spamService.searchContactByName(
          functionContext,
          searchContactRequest
        );
      } else if (
        searchContactRequest?.searchContactName == null &&
        searchContactRequest?.searchPhone != null
      ) {
        searchContactDBResult = await spamService.searchContactByPhone(
          functionContext,
          searchContactRequest
        );
      }
      response(functionContext, responseObj, searchContactDBResult);
    } catch (errSearchContact) {
      if (!errSearchContact.ErrorMessage && !errSearchContact.ErrorCode) {
        logger.logInfo(`searchContactDBResult :: Error :: ${errSearchContact}`);
        functionContext.error = new ErrorModel(
          errorMessage.applicationError,
          errorCode.applicationError
        );
      }
      logger.logInfo(
        `searchContactDBResult :: Error :: ${JSON.stringify(errSearchContact)}`
      );
      response(functionContext, responseObj, null);
    }
  },
};

module.exports = teamController;

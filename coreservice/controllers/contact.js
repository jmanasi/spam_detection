const applib = require("applib");
const momentTimezone = require("moment-timezone");
const { errorMessage, errorCode } = require("../utils/constant");
const { response, generateToken } = require("../utils/helper");
const { ErrorModel } = require("../models/error");
const requestModel = require("../models/request");
const responseModel = require("../models/response");
const contactService = require("../services/contact");
const validate = require("../utils/validate");
require("dotenv").config({ path: __dirname + "/.env" });

const teamController = {
  getAllContacts: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`getAllContacts() invoked!!`);

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
      name: "getAllContacts",
      model: new responseModel.getAllContacts(),
    };

    let getAllContactsRequest = new requestModel.getAllContacts(req);

    logger.logInfo(
      `getAllContacts() :: Request Object :: ${getAllContactsRequest}`
    );

    let validateRequest = validate.getAllContacts(getAllContactsRequest);
    if (validateRequest.error) {
      functionContext.error = new ErrorModel(
        validateRequest.error.details[0]["message"],
        errorCode.invalidRequest
      );
      logger.logInfo(
        `getAllContacts() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }

    try {
      let getAllContactsDBResult = await contactService.getAllContacts(
        functionContext,
        getAllContactsRequest
      );
      const pageNumber = parseInt(getAllContactsRequest?.pageNumber) || 1; // Get the current page number from the query parameters
      const startIndex =
        (pageNumber - 1) * parseInt(getAllContactsRequest?.pageSize);
      const endIndex = startIndex + parseInt(getAllContactsRequest?.pageSize);

      if (getAllContactsRequest?.pageNumber > 0) {
        response(
          functionContext,
          responseObj,
          getAllContactsDBResult?.slice(startIndex, endIndex)
        );
      } else {
        response(functionContext, responseObj, getAllContactsDBResult);
      }
    } catch (errGetAllContacts) {
      if (!errGetAllContacts.ErrorMessage && !errGetAllContacts.ErrorCode) {
        logger.logInfo(
          `getAllContactsDBResult :: Error :: ${errGetAllContacts}`
        );
        functionContext.error = new ErrorModel(
          errorMessage.applicationError,
          errorCode.applicationError
        );
      }
      logger.logInfo(
        `getAllContactsDBResult :: Error :: ${JSON.stringify(
          errGetAllContacts
        )}`
      );
      response(functionContext, responseObj, null);
    }
  },
  addContact: async (req, res) => {
    let logger = new applib.Logger(req.originalUrl);

    logger.logInfo(`addContact() invoked!!`);

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
      name: "addContact",
      model: new responseModel.addContact(),
    };

    let addContactRequest = new requestModel.addContact(req);

    logger.logInfo(`addContact() :: Request Object :: ${addContactRequest}`);

    let validateRequest = validate.addContact(addContactRequest);
    if (validateRequest.error) {
      functionContext.error = new ErrorModel(
        validateRequest.error.details[0]["message"],
        errorCode.invalidRequest
      );
      logger.logInfo(
        `addContact() Error:: Invalid Request :: ${JSON.stringify(
          validateRequest
        )}`
      );
      response(functionContext, responseObj, null);
      return;
    }
    try {
      let addContactDBResult = await contactService.addContact(
        functionContext,
        addContactRequest
      );

      response(functionContext, responseObj, addContactDBResult);
    } catch (errAddContact) {
      if (!errAddContact.ErrorMessage && !errAddContact.ErrorCode) {
        logger.logInfo(`addContactDBResult :: Error :: ${errAddContact}`);
        functionContext.error = new ErrorModel(
          errorMessage.applicationError,
          errorCode.applicationError
        );
      }
      logger.logInfo(
        `addContactDBResult :: Error :: ${JSON.stringify(errAddContact)}`
      );
      response(functionContext, responseObj, null);
    }
  },
};

module.exports = teamController;

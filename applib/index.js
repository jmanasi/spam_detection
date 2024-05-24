// require("dotenv").config({ path: __dirname + "/.env" });
// require("dotenv").config();
// rest of your code

let logger = require("./logger").LoggerModel;
let constant = require("./constant");
let jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const getFileUploadConfig = require("./functions");
const fs = require("fs");

const { ErrorModel } = require("./error");

exports.SendHttpResponse = function (functionContext, response) {
  let httpResponseType = constant.ErrorCode.Success;
  functionContext.res.writeHead(httpResponseType, {
    "Content-Type": "application/json",
  });
  functionContext.responseText = JSON.stringify(response);
  functionContext.res.end(functionContext.responseText);
};

module.exports.fetchDBSettings = async function (
  logger,
  settings,
  databaseModule
) {
  try {
    logger.logInfo("fetchDBSettings()");
    let rows = await databaseModule.knex.raw(`CALL get_app_settings`);
    // let dbSettingsValue = rows[0][0][0];
    let dbSettingsValue = rows[0][0];
    logger.logInfo(
      `fetchDBSettings() successfull ${JSON.stringify(dbSettingsValue)}`
    );
    // settings.APP_KEY = dbSettingsValue.APP_KEY;
    // settings.APP_SECRET = dbSettingsValue.APP_SECRET;
    settings.APP_KEY = dbSettingsValue[0].value;
    settings.APP_SECRET = dbSettingsValue[1].value;
    return;
  } catch (errGetSettingsFromDB) {
    logger.logInfo("Error in fetchDBSettings()");
    throw errGetSettingsFromDB;
  }
};

module.exports.validateToken = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authtoken;

    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    // Verify the token
    // jwt.verify(token, process.env.JWT_SECRET_KEY);
    jwt.verify(token, "s@1R099m@<24");

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ errorCode: 401, message: "Invalid token" });
  }
};
const fileUpload = async (
  functionContext,
  imageUrl,
  image,
  folderName,
  path
) => {
  let logger = functionContext.logger;

  logger.logInfo(`fileUpload() Invoked()`);

  const spacesEndpoint = new AWS.Endpoint(process.env.SpacesEndPoint);

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.AccessKeyId,
    secretAccessKey: process.env.SecretAccessKey,
  });

  const params = {
    Bucket: process.env.Bucket,
    // Key: `${Math.random(4)}_${imageUrl}`,
    Key: `${folderName}/${imageUrl}`,
    Body: image,
    ACL: "public-read",
  };

  try {
    const response = await s3.upload(params).promise();
    // Delete the file from the local filesystem after uploading to S3
    fs.unlink(path, (err) => {
      if (err) {
        console.log("Error deleting QR file:", err);
      } else {
        console.log("QR File deleted from:", path);
      }
    });
    return response.Location;
  } catch (err) {
    logger.logInfo(`fileUpload() :: Error :: ${JSON.stringify(err)}`);
    functionContext.error = new ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );
    throw functionContext.error;
  }
};
module.exports.Logger = logger;
module.exports.fileUploadConfig = getFileUploadConfig;
module.exports.fileUpload = fileUpload;

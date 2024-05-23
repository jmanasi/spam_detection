require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

// project packages
const appLib = require("applib");
const middleware = require("middleware");

//project constants
const logger = new appLib.Logger(null);
const upload = appLib.fileUploadConfig;

app.use(cors());
app.use(express.json());

app.use(function (_req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

// app.use(upload.array("File"));
app.use(upload.fields([{ name: "File" }, { name: "mediaItem" }]));

startAuthServer(logger);

app.use(middleware.validateRequest);

const routes = require("./routes/index");
app.use("/api/core", routes);

const coreServiceRoutes = require("./routes/index");
app.use("/api/core", coreServiceRoutes);

async function startAuthServer(log) {
  try {
    log.logInfo(`startAuthServer Invoked()`);

    app.listen(process.env.CORESERVICE_PORT, () => {
      log.logInfo(
        "CORE SERVER running on port " + process.env.CORESERVICE_PORT
      );
      console.log(
        "CORESERVICE running on port " + process.env.CORESERVICE_PORT
      );
    });
  } catch (errFetchDBSettings) {
    log.logInfo("Error occured in starting AUTH SERVER. Need immediate check.");
  }
}
module.exports = app;

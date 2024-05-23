const momentTimezone = require("moment-timezone");
const multer = require("multer");

const today = momentTimezone(new Date()).format(`DD-MM-YYYY_HH-mm-ss`);

const getFileUploadConfig = multer({
  storage: multer.diskStorage({
    destination: process.env.LocalStorage,

    filename: function (_req, file, cb) {
      cb(null, `wwb_test_${today}_${file.originalname.replace(/ /g, "_")}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    cb(null, true);
  },
});

module.exports = getFileUploadConfig;

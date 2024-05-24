const router = require("express").Router();
// const applib = require("applib");
const applib = require("../../applib");

const authController = require("../controllers/auth");
const userController = require("../controllers/user");

router.post("/validateuser", userController.validateUser);
router.post("/login", authController.login);
router.post("/logout", applib.validateToken, authController.logout);
router.post("/registerUser", userController.registerUser);
router.get("/getUser", applib.validateToken, userController.getUser);

module.exports = router;

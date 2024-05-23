const router = require("express").Router();
const applib = require("applib");

// controllers
const contactController = require("../controllers/contact");
const spamController = require("../controllers/spam");

//contact
router.post("/addContact", applib.validateToken, contactController.addContact);

router.get(
  "/getAllContact",
  applib.validateToken,
  contactController.getAllContacts
);

//spam
router.put(
  "/markContactAsSpam",
  applib.validateToken,
  spamController.markContactAsSpam
);
router.get(
  "/searchContact",
  applib.validateToken,
  spamController.searchContact
);
router.get(
  "/getAllSpamContacts",
  applib.validateToken,
  spamController.getAllSpamContacts
);

module.exports = router;

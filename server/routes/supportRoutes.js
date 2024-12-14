const express = require("express");
const supportController = require("../controllers/supportController");

const router = express.Router();

router.post(
  "/new-appeal",
  supportController.newAppealSupportController
);

module.exports = router;

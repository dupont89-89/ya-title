const express = require("express");
const gptController = require("../controllers/gptController");

const router = express.Router();

router.get("/title", gptController.apiGptTitleOneController);

module.exports = router;

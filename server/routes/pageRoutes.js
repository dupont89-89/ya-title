const express = require("express");
const pageAppController = require("../controllers/page/pageAppController");

const router = express.Router();

router.post("/new-app", pageAppController.newPageAppController);

module.exports = router;

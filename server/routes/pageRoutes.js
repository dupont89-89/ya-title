const express = require("express");
const pageAppController = require("../controllers/page/pageAppController");

const router = express.Router();

router.post("/new-app", pageAppController.newPageAppController);
router.post("/edit-page-app", pageAppController.editPageAppController);
router.get("/get-page-app", pageAppController.getPageAppController);

module.exports = router;

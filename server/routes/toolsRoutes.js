const express = require("express");
const toolsFileSaveController = require("../controllers/toolsFileSaveController");

const router = express.Router();

router.post(
  "/upload-file",
  toolsFileSaveController.uploadFileToolsUserController
);

router.post("/fetch-key", toolsFileSaveController.keyCommerceToolsController);

module.exports = router;

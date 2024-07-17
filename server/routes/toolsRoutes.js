const express = require("express");
const toolsFileSaveController = require("../controllers/toolsFileSaveController");
const apiDirectController = require("../controllers/apiDirectController");

const router = express.Router();

router.post(
  "/upload-file",
  toolsFileSaveController.uploadFileToolsUserController
);

router.post("/fetch-key", toolsFileSaveController.keyCommerceToolsController);
router.post("/count-word", apiDirectController.apiDirectWordContController);
router.get("/get-direct-ball", apiDirectController.apiDirectBallContController);

module.exports = router;

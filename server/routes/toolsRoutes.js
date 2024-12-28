const express = require("express");
const toolsFileSaveController = require("../controllers/toolsFileSaveController");
const apiDirectController = require("../controllers/apiDirectController");
const titleController = require("../controllers/titleController");
const whoisDomenController = require("../controllers/whoisDomenController");
const yandexIksController = require("../controllers/yandexIksController");
const domenGetDeleteController = require("../controllers/domenGetDeleteController");

const router = express.Router();

router.post(
  "/upload-file",
  toolsFileSaveController.uploadFileToolsUserController
);

router.post("/fetch-key", toolsFileSaveController.keyCommerceToolsController);
router.post("/get-iks", yandexIksController.getIksContController);
router.post("/count-word", apiDirectController.apiDirectWordContController);
router.get("/get-direct-ball", apiDirectController.apiDirectBallContController);
router.get("/whois", whoisDomenController.whoisDomenController);
router.get("/get-domen-delete-ru", domenGetDeleteController.getDomainListRu);
router.get(
  "/whois-subscription",
  whoisDomenController.whoisDomenSubscriptionController
);
router.get(
  "/whois-subscription-delete",
  whoisDomenController.deleteWhoisDomenSubscriptionController
);
router.get(
  "/get-domen-subscription",
  whoisDomenController.getDomenSubscriptionController
);
router.post("/get-title", titleController.getTitle);

module.exports = router;

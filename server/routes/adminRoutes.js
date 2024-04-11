const express = require("express");
const adminUserControllers = require("../controllers/adminUserControllers");
const lvtUserController = require("../controllers/lvtUserController");

const router = express.Router();

router.get("/admin-get-user", adminUserControllers.adminDataUserController);
router.get(
  "/admin-edit-user-status",
  adminUserControllers.adminEditStatusUserController
);
router.get("/admin-add-lvt-user", lvtUserController.adminAddLvtUserController);

module.exports = router;

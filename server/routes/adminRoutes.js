const express = require("express");
const adminUserControllers = require("../controllers/adminUserControllers");

const router = express.Router();

router.get("/admin-get-user", adminUserControllers.adminDataUserController);
router.get(
  "/admin-edit-user-status",
  adminUserControllers.adminEditStatusUserController
);

module.exports = router;

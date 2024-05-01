const express = require("express");
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");
const lvtUserController = require("../controllers/lvtUserController");
const supportMessageContoller = require("../controllers/supportMessageContoller");
const adminUserControllers = require("../controllers/adminUserControllers");
const editUserControllers = require("../controllers/editUserControllers");
const refControllers = require("../controllers/refControllers");

const router = express.Router();

router.post("/signup", userController.signUpUserController);
router.get("/signup/ref", refControllers.authRefAddUser);
router.post("/auth", authController.authUserController);
router.post("/load-avatar", editUserControllers.uploadAvatarUserController);
router.get("/get-user", userController.dataUserController);
router.get("/spend-lvt-one-title", lvtUserController.spendLvtUserController);
router.get("/add-lvt-user", lvtUserController.userAddLvtUserController);
router.get(
  "/get-message-support",
  supportMessageContoller.supportMessageContoller
);
router.get(
  "/clear-message-support",
  supportMessageContoller.clearSupportMessageContoller
);
router.get("/admin-get-user", adminUserControllers.adminDataUserController);
router.get(
  "/admin-edit-user-status",
  adminUserControllers.adminEditStatusUserController
);
router.get("/user-edit-data", editUserControllers.editDataUserController);

module.exports = router;

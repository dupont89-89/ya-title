const express = require("express");
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");
const lvtUserController = require("../controllers/lvtUserController");
const supportMessageContoller = require("../controllers/supportMessageContoller");

const router = express.Router();

router.post("/signup", userController.signUpUserController);
router.post("/auth", authController.authUserController);
router.get("/get-user", userController.dataUserController);
router.get("/spend-lvt-one-title", lvtUserController.spendLvtUserController);
router.get(
  "/get-message-support",
  supportMessageContoller.supportMessageContoller
);
router.get(
  "/clear-message-support",
  supportMessageContoller.clearSupportMessageContoller
);

module.exports = router;

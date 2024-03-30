const express = require("express");
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");
const lvtUserController = require("../controllers/lvtUserController");

const router = express.Router();

router.post("/signup", userController.signUpUserController);
router.post("/auth", authController.authUserController);
router.get("/get-user", userController.dataUserController);
router.get("/spend-lvt-one-title", lvtUserController.spendLvtUserController);

module.exports = router;

const express = require("express");
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", userController.signUpUserController);
router.post("/auth", authController.authUserController);
router.get("/get-user", userController.dataUserController);

module.exports = router;

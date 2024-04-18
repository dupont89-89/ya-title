const express = require("express");
const payControllers = require("../controllers/payControllers");

const router = express.Router();

router.post("/user-sum", payControllers.payRobokassaController);

module.exports = router;

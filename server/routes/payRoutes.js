const express = require("express");
const payControllers = require("../controllers/payControllers");

const router = express.Router();

router.get("/success-payment-score", payControllers.payRobokassaController);

module.exports = router;

const express = require("express");
const payControllers = require("../controllers/payControllers");

const router = express.Router();

router.get(
  "/success-payment-score",
  payControllers.payScoreRobokassaController
);
router.get("/success-payment", payControllers.payRobokassaController);

module.exports = router;

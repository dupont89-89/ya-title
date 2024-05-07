const express = require("express");
const payControllers = require("../controllers/payControllers");

const router = express.Router();

router.get(
  "/success-payment-score",
  payControllers.payScoreRobokassaController
);
router.get("/success-payment", payControllers.payRobokassaController);
router.get("/get-payment-score", payControllers.getScoreController);

module.exports = router;

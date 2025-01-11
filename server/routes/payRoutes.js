import express from "express"; // Импортируем express
import {
  payScoreRobokassaController,
  payRobokassaController,
  getScoreController,
} from "../controllers/payControllers.js"; // Исправляем на именованные экспорты

const router = express.Router();

// Настраиваем маршруты
router.get("/success-payment-score", payScoreRobokassaController);
router.get("/success-payment", payRobokassaController);
router.get("/get-payment-score", getScoreController);

export default router; // Экспортируем маршрутизатор

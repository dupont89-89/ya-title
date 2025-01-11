import express from "express"; // Импортируем express
import { apiGptTitleOneController } from "../controllers/gptController.js"; // Исправляем на именованный экспорт

const router = express.Router();

// Настраиваем маршруты
router.get("/title", apiGptTitleOneController);

export default router; // Экспортируем маршрутизатор

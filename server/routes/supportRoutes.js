import express from "express"; // Импортируем express
import { newAppealSupportController } from "../controllers/supportController.js"; // Исправляем на именованный экспорт

const router = express.Router();

// Настраиваем маршрут
router.post("/new-appeal", newAppealSupportController);

export default router; // Экспортируем маршрутизатор

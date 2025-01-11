import express from "express"; // Импортируем express
import {
  newPageAppController,
  editPageAppController,
  getPageAppController,
} from "../controllers/page/pageAppController.js"; // Исправляем на именованные экспорты

const router = express.Router();

// Настраиваем маршруты
router.post("/new-app", newPageAppController);
router.post("/edit-page-app", editPageAppController);
router.get("/get-page-app", getPageAppController);

export default router; // Экспортируем маршрутизатор

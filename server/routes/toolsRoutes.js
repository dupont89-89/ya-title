import express from "express"; // Импортируем express
import {
  uploadFileToolsUserController,
  keyCommerceToolsController,
} from "../controllers/toolsFileSaveController.js"; // Исправляем на именованные экспорты
import {
  apiDirectWordContController,
  apiDirectBallContController,
} from "../controllers/apiDirectController.js"; // Исправляем на именованные экспорты
import { getTitle } from "../controllers/titleController.js"; // Исправляем на именованный экспорт
import {
  whoisDomenController,
  whoisDomenSubscriptionController,
  deleteWhoisDomenSubscriptionController,
  getDomenSubscriptionController,
} from "../controllers/whoisDomenController.js"; // Исправляем на именованные экспорты
import { getIksContController } from "../controllers/yandexIksController.js"; // Исправляем на именованный экспорт
import { getDomainListRu } from "../controllers/domenGetDeleteController.js"; // Исправляем на именованный экспорт

const router = express.Router();

// Настраиваем маршруты
router.post("/upload-file", uploadFileToolsUserController);
router.post("/fetch-key", keyCommerceToolsController);
router.post("/get-iks", getIksContController);
router.post("/count-word", apiDirectWordContController);
router.get("/get-direct-ball", apiDirectBallContController);
router.get("/whois", whoisDomenController);
router.get("/get-domen-delete-ru", getDomainListRu);
router.get("/whois-subscription", whoisDomenSubscriptionController);
router.get(
  "/whois-subscription-delete",
  deleteWhoisDomenSubscriptionController
);
router.get("/get-domen-subscription", getDomenSubscriptionController);
router.post("/get-title", getTitle);

export default router; // Экспортируем маршрутизатор

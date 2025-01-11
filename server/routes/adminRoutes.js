import express from "express"; // Заменяем require на import
import {
  adminDataUserController,
  adminEditStatusUserController,
} from "../controllers/adminUserControllers.js";
// Добавляем расширение файлов
import { adminAddLvtUserController } from "../controllers/lvtUserController.js"; // Добавляем расширение файлов
import { mailMessageController } from "../SMTP/mail.js"; // Добавляем расширение файлов

const router = express.Router();

router.get("/admin-get-user", adminDataUserController);
router.get("/admin-edit-user-status", adminEditStatusUserController);
router.get("/admin-add-lvt-user", adminAddLvtUserController);
router.post("/send-email", mailMessageController);

export default router; // Заменяем module.exports на export default

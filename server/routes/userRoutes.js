import express from "express"; // Импортируем express
import {
  signUpUserController,
  dataUserController,
} from "../controllers/userControllers.js"; // Исправляем на именованные импорты
import {
  authUserController,
  authVKController,
  authResetUserPasswordController,
  tokenResetUserPasswordController,
} from "../controllers/authController.js"; // Исправляем на именованные импорты
import {
  spendLvtUserController,
  userAddLvtUserController,
} from "../controllers/lvtUserController.js"; // Исправляем на именованные импорты
import {
  supportMessageContoller,
  clearSupportMessageContoller,
} from "../controllers/supportMessageContoller.js"; // Исправляем на именованные импорты
import {
  adminDataUserController,
  adminEditStatusUserController,
} from "../controllers/adminUserControllers.js"; // Исправляем на именованные импорты
import {
  uploadAvatarUserController,
  editDataUserController,
} from "../controllers/editUserControllers.js"; // Исправляем на именованные импорты
import { authRefAddUser } from "../controllers/refControllers.js"; // Исправляем на именованные импорты

const router = express.Router();

// Настраиваем маршруты
router.post("/signup", signUpUserController);
router.get("/signup/ref", authRefAddUser);
router.post("/auth", authUserController);
router.post("/auth/vk", authVKController);
router.post("/reset-password", authResetUserPasswordController);
router.post("/reset-password/:token", tokenResetUserPasswordController);
router.post("/load-avatar", uploadAvatarUserController);
router.get("/get-user", dataUserController);
router.get("/spend-lvt", spendLvtUserController);
router.get("/add-lvt-user", userAddLvtUserController);
router.get("/get-message-support", supportMessageContoller);
router.get("/clear-message-support", clearSupportMessageContoller);
router.get("/admin-get-user", adminDataUserController);
router.get("/admin-edit-user-status", adminEditStatusUserController);
router.get("/user-edit-data", editDataUserController);

export default router; // Экспортируем маршрутизатор

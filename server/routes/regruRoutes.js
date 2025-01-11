import express from "express";
import { getDomenChekController } from "../controllers/regru/domenChekController.js";

const router = express.Router();

// Настраиваем маршрут
router.post("/chek-domen", getDomenChekController);

export default router; // Экспортируем маршрутизатор

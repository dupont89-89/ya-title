import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cron from "node-cron";
import { Server as socketIo } from "socket.io"; // Исправленный импорт
import http from "http";
import { fileURLToPath } from "url"; // Для преобразования import.meta.url в путь к файлу
import { promises as fsPromises } from "fs";

// Импорт маршрутов
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import payRoutes from "./routes/payRoutes.js";
import toolsRoutes from "./routes/toolsRoutes.js";
import gptRoutes from "./routes/gptRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import getTitleRoute from "./routes/getTitleRoute.js";
import regruRoutes from "./routes/regruRoutes.js";

import { updateBonusLvt } from "./utils/updateBonusLvt.js";
import { checkSubscriptions } from "./utils/whois/whoisDomenCronUser.js";

// Получаем текущую директорию с помощью import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Получаем путь к текущей директории

const app = express();
const server = http.createServer(app);

const io = new socketIo(server, {
  cors: {
    origin: process.env.REACT_APP_URL_FRONTEND,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Получение списка разрешенных доменов из переменных окружения
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

// Вывод разрешенных доменов для отладки
console.log("Allowed origins:", allowedOrigins);

app.use(express.json());

// Middleware для разрешения CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Подключение к MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Маршруты
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pay", payRoutes);
app.use("/api/tools", toolsRoutes);
app.post("/api/get-title", getTitleRoute);
app.use("/api/gpt", gptRoutes);
app.use("/api/page", pageRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/reg-ru", regruRoutes);

// Обслуживание статических файлов из папки uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Эндпоинт для отдачи файла
// Этот маршрут будет использоваться для предоставления файлов
app.get("/uploads/*", async (req, res) => {
  const filePath = path.join(__dirname, req.url);

  try {
    // Проверяем, существует ли файл с помощью fs.promises.access
    await fsPromises.access(filePath, fs.constants.F_OK);
    // Если файл существует, отправляем его
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${path.basename(filePath)}"`
    );
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Ошибка при отправке файла:", err);
        return res.status(500).send("Ошибка сервера");
      }
    });
  } catch (err) {
    console.error("Файл не найден:", filePath);
    return res.status(404).send("Файл не найден");
  }
});

// Поддержка статических файлов из папки build
app.use(express.static(path.join(__dirname, "..", "build")));

// Установим лимит на размер тела запроса (например, 20 MB)
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Обработка всех маршрутов через index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Прослушивание соединений Socket.IO
io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Запуск ежедневной задачи в 00:00 по Москве
cron.schedule("0 9 * * *", () => {
  updateBonusLvt(io); // Передаем экземпляр socket.io в функцию updateBonusLvt
});

// Планируем выполнение проверки каждый день в 00:00:01 UTC
cron.schedule("1 0 * * *", checkSubscriptions, {
  timezone: "UTC",
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const payRoutes = require("./routes/payRoutes");
const cron = require("node-cron");
const { updateBonusLvt } = require("./utils/updateBonusLvt");
const http = require("http");
const socketIo = require("socket.io");
const getTitleRoute = require("./routes/getTitleRoute"); // Импортируем маршрут
const app = express();
const server = http.createServer(app);
const { fetchYandexKey } = require("./tools-key-info/yandex-xml");
const io = socketIo(server, {
  cors: {
    origin: process.env.REACT_APP_URL_FRONTEND,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;
const URL_FRONTEND = process.env.REACT_APP_URL_FRONTEND;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

// Middleware для разрешения CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", URL_FRONTEND); // Разрешаем запросы с URL фронтенда
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // Разрешаем различные HTTP методы
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Разрешаем различные заголовки
  res.setHeader("Access-Control-Allow-Credentials", true); // Разрешаем передавать учетные данные (например, куки)
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
// Маршруты
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pay", payRoutes);
app.post("/api/get-title", getTitleRoute);
app.post("/api/fetch-key", async (req, res) => {
  console.log("Received request at /api/fetch-key");
  const { query } = req.body;

  try {
    const response = await fetchYandexKey(query);

    // Проверяем, что response не пустой массив, а строка или массив с результатами
    if (typeof response === "string") {
      res.status(200).json({ result: response });
    } else if (Array.isArray(response) && response.length > 0) {
      res.status(200).json({ result: response });
    } else {
      res.status(200).json({ result: "Нет данных" });
    }
  } catch (error) {
    console.error("Error in /api/fetch-key:", error);
    res.status(500).json({ error: "Ошибка при выполнении запроса" });
  }
});

// Обслуживание статических файлов из папки uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Поддержка статических файлов из папки build
app.use(express.static(path.join(__dirname, "..", "build")));

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

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

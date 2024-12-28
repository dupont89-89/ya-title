require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const payRoutes = require("./routes/payRoutes");
const toolsRoutes = require("./routes/toolsRoutes");
const gptRoutes = require("./routes/gptRoutes");
const pageRoutes = require("./routes/pageRoutes");
const supportRoutes = require("./routes/supportRoutes");
const getTitleRoute = require("./routes/getTitleRoute"); // Импортируем маршрут
const cron = require("node-cron");
const { updateBonusLvt } = require("./utils/updateBonusLvt");
const http = require("http");
const socketIo = require("socket.io");
const { checkSubscriptions } = require("./utils/whois/whoisDomenCronUser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
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

// Обслуживание статических файлов из папки uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// // Планируем выполнение проверки каждый день в 00:00:01 UTC
cron.schedule("1 0 * * *", checkSubscriptions, {
  timezone: "UTC",
});

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

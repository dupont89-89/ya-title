require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const payRoutes = require("./routes/payRoutes");

const cron = require("node-cron");
const { updateBonusLvt } = require("./utils/updateBonusLvt");
const app = express();
const http = require("http");
const PORT = process.env.PORT || 5000;
const apiKey = process.env.REACT_APP_API_KEY;
const yaCatalog = process.env.REACT_APP_YANDEX_CATALOG;
const URL_FRONTEND = process.env.REACT_APP_URL_FRONTEND;
const MONGO_URI = process.env.MONGO_URI;
const socketIo = require("socket.io");

app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: URL_FRONTEND,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware для разрешения CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${URL_FRONTEND}`); // Разрешаем запросы с localhost:3000 или домена
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // Разрешаем различные HTTP методы
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Разрешаем различные заголовки
  res.setHeader("Access-Control-Allow-Credentials", true); // Разрешаем передавать учетные данные (например, куки)
  next();
});

const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(
  "/api/get-title",
  createProxyMiddleware({
    target: "https://yandex.ru",
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const selectedCity = req.query.selectedCity || "213";
      console.log(selectedCity);
      return `/search/xml?folderid=${yaCatalog}&filter=moderate&lr=${selectedCity}&l10n=ru`;
    },
    onProxyReq(proxyReq, reqProxy, res) {
      console.log("Request URL:", proxyReq.path);
      console.log("Request Headers:", proxyReq._headers);
      proxyReq.setHeader("Authorization", `Api-Key ${apiKey}`);
    },
  })
);

//Маршруты
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pay", payRoutes);

//Обслуживание статических файлов
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Прослушивание соединений
io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Запускаем ежедневную задачу в 00:00 по Москве
cron.schedule("0 9 * * *", () => {
  updateBonusLvt(io); // Передаем экземпляр socket.io в функцию updateBonusLvt
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

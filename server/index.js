require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.REACT_APP_API_KEY;
const yaCatalog = process.env.REACT_APP_YANDEX_CATALOG;
const URL_FRONTEND = process.env.REACT_APP_URL_FRONTEND;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

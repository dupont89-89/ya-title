const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware для разрешения CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Разрешаем запросы с localhost:3000
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // Разрешаем различные HTTP методы
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Разрешаем различные заголовки
  res.setHeader("Access-Control-Allow-Credentials", true); // Разрешаем передавать учетные данные (например, куки)
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://yandex.ru",
    changeOrigin: true,
    pathRewrite: {
      "^/api":
        "/search/xml?folderid=b1gemoaetdknc1hodeee&filter=moderate&lr=213&l10n=ru",
    },
    onProxyReq(proxyReq, req, res) {
      // Добавьте логирование для просмотра адреса запроса и установленных заголовков
      console.log("Request URL:", proxyReq.path);
      console.log("Request Headers:", proxyReq._headers);

      // Добавьте любые заголовки, которые могут потребоваться для аутентификации
      proxyReq.setHeader(
        "Authorization",
        "Api-Key AQVN0qCGDXIufvoikxRcR0ImZiaPAldgTfDJjf-f"
      );
    },
  })
);

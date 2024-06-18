const { createProxyMiddleware } = require("http-proxy-middleware");

const getTitleRoute = createProxyMiddleware({
  target: "https://yandex.ru",
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const selectedCity = req.query.selectedCity || "213";
    return `/search/xml?folderid=${process.env.REACT_APP_YANDEX_CATALOG}&filter=moderate&lr=${selectedCity}&l10n=ru`;
  },
  onProxyReq(proxyReq, reqProxy, res) {
    proxyReq.setHeader(
      "Authorization",
      `Api-Key ${process.env.REACT_APP_API_KEY}`
    );
  },
});

module.exports = getTitleRoute;

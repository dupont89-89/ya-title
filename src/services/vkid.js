import * as VKID from "@vkid/sdk";

VKID.Config.init({
  app: 52208411, // Идентификатор приложения.
  redirectUrl: "http://localhost", // Адрес для перехода после авторизации.
  state: "6j21fgsad5sd82", // Произвольная строка состояния приложения.
  codeVerifier: "FGH767Gd65", // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
  mode: VKID.ConfigAuthMode.InNewTab, // По умолчанию авторизация открывается в новой вкладке.
});

export default VKID;

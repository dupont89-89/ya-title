import React, { useEffect, useRef } from "react";
import * as VKID from "@vkid/sdk";

export default function SignInVk() {
  const containerRef = useRef(null);

  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("../../config.dev");
  } else {
    config = require("../../config.prod");
  }

  useEffect(() => {
    // Инициализация SDK
    VKID.Config.init({
      app: 52208411, // ID приложения
      redirectUrl: `${config.REACT_APP_FRONT_URL_VKID}/signup/vk/`, // URL для редиректа после авторизации
      scope: "email",
    });

    const oneTap = new VKID.OneTap();

    // Используем setTimeout для небольшой задержки
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        oneTap.render({
          container: containerRef.current,
          oauthList: ["mail_ru"], // Добавляем список социальных сетей
        });
      } else {
        console.error("Container element is not available.");
      }
    }, 100); // Задержка в 100 мс

    // Очистка при размонтировании компонента
    return () => {
      clearTimeout(timeoutId);
      oneTap.close();
    };
  }, []);

  // Здесь будет обработка кода после авторизации
  useEffect(() => {
    // Получаем параметры из URL (код и device_id)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const device_id = urlParams.get("device_id");

    if (code && device_id) {
      // Когда код и device_id получены, обменяем их на токен
      VKID.Auth.exchangeCode(code, device_id)
        .then((tokenResponse) => {
          console.log("Token response:", tokenResponse);

          if (tokenResponse.accessToken) {
            // Получаем информацию о пользователе
            VKID.Auth.userInfo(tokenResponse.accessToken)
              .then((userInfo) => {
                console.log("User Info:", userInfo);
                // Тут можно передать информацию о пользователе в состояние или в другие части вашего приложения
              })
              .catch((error) => {
                console.error(
                  "Ошибка при получении данных пользователя:",
                  error
                );
              });
          }
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токен:", error);
        });
    }
  }, [window.location.search]); // Включаем зависимость от изменения параметров URL

  return <div ref={containerRef}></div>;
}

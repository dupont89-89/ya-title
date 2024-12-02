import React, { useEffect, useState } from "react";
import CircularWithValueLabel from "../../app-function/Loading";
import * as VKID from "@vkid/sdk";

export default function PageAuthVk() {
  const [params, setParams] = useState({
    code: "",
    expires_in: "",
    device_id: "",
    state: "",
    type: "",
  });

  const [user, setUser] = useState(null); // для хранения данных о пользователе

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setParams({
      code: queryParams.get("code") || "",
      expires_in: queryParams.get("expires_in") || "",
      device_id: queryParams.get("device_id") || "",
      state: queryParams.get("state") || "",
      type: queryParams.get("type") || "",
    });
  }, []); // пустой массив зависимостей, чтобы избежать повторного вызова

  const exchangeCodeAndFetchUserInfo = async (code, device_id) => {
    try {
      // Инициализация SDK VK
      VKID.Config.init({
        app: 52208411, // укажите ваш client_id
        redirectUrl: "http://localhost/signup/vk/", // redirectUrl
      });

      // Обмен авторизационного кода на токен
      const tokenResponse = await VKID.Auth.exchangeCode(code, device_id);
      console.log("Token response:", tokenResponse);

      // Проверяем наличие access_token
      if (!tokenResponse || !tokenResponse.access_token) {
        console.error(
          "Некорректный ответ от VKID.Auth.exchangeCode:",
          tokenResponse
        );
        throw new Error("Ошибка обмена кода на токен");
      }

      const { access_token } = tokenResponse;

      // Получение данных о пользователе с использованием access_token
      const userInfo = await VKID.Auth.userInfo(access_token);
      console.log("User info:", userInfo);

      // Сохраняем данные о пользователе
      setUser(userInfo.user);
      debugger;
    } catch (error) {
      console.error("Ошибка при обмене кода на токен:", error.message || error);
    }
  };

  // Если есть код и device_id, вызываем обмен кода на токен
  useEffect(() => {
    if (params.code && params.device_id) {
      exchangeCodeAndFetchUserInfo(params.code, params.device_id);
    }
  }, [params.code, params.device_id]); // зависит от кода и device_id

  return (
    <div>
      {user ? (
        <div>
          <h2>Привет, {user.first_name}!</h2>
          <p>Email: {user.email}</p>
          <p>VK ID: {user.id}</p>
          {/* Дополнительные данные */}
        </div>
      ) : (
        <CircularWithValueLabel />
      )}
    </div>
  );
}

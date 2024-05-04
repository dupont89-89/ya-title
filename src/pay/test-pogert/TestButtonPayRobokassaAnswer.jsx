import React from "react";
const md5 = require("md5");

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./../../config.dev");
} else {
  config = require("./../../config.prod");
}

const merchant_login = config.ROBOKASSA_SHOP_NAME;
const password_2 = config.ROBOKASSA_PASSWORD_2;
const IsTest = config.ROBOKASSA_TEST;

const TestButtonPayRobokassaAnswer = () => {
  const sendTestRequest = () => {
    // Параметры запроса
    const signatureValue = md5(`${merchant_login}:105:769726:${password_2}`);

    const params = {
      OutSum: "105.00",
      InvId: "769726",
      SignatureValue: signatureValue,
      IsTest: IsTest,
    };

    // Преобразование параметров в строку запроса
    const queryString = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    // URL для отправки запроса
    const url = "http://localhost:8080/api/pay/success-payment?" + queryString;
    debugger;

    // Отправка GET запроса
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.redirectUrl) {
          // Если есть URL для перенаправления, перенаправляем пользователя на этот URL
          window.location.href = data.redirectUrl;
        } else {
          // Если нет URL для перенаправления, выводим сообщение об успешной оплате
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Ошибка при отправке запроса:", error);
        // Здесь можно обработать ошибку при отправке запроса, если необходимо
      });
  };

  return (
    <div>
      <h2>Инциализировать оплату от Робокассы</h2>
      <button onClick={sendTestRequest}>Отправить запрос</button>
    </div>
  );
};

export default TestButtonPayRobokassaAnswer;

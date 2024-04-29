import React from "react";

const TestButtonPayAddScore = () => {
  const sendTestRequest = () => {
    // Параметры запроса
    const params = {
      OutSum: "1390.00",
      InvId: "902369",
      userId: "660ef35a9b26cda5b3875e59",
    };

    // Преобразование параметров в строку запроса
    const queryString = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    // URL для отправки запроса
    const url =
      "http://localhost:8080/api/pay/success-payment-score?" + queryString;

    // Отправка GET запроса
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Успешный ответ от сервера:", data);
        // Здесь можно обработать успешный ответ от сервера, если необходимо
      })
      .catch((error) => {
        console.error("Ошибка при отправке запроса:", error);
        // Здесь можно обработать ошибку при отправке запроса, если необходимо
      });
  };

  return (
    <div>
      <h2>Создание счетов</h2>
      <button onClick={sendTestRequest}>Создать счёт</button>
    </div>
  );
};

export default TestButtonPayAddScore;

import React from "react";
import axios from "axios";

export default function ApiSendYaSearch() {
  const handleClick = async () => {
    const xmlData = `<?xml version="1.0" encoding="utf-8"?>
        <request>
            <query>yandex</query>
            <sortby>rlv</sortby>
            <groupings>
                <groupby attr="" mode="flat" groups-on-page="10" docs-in-group="1" />
            </groupings>
            <maxpassages>4</maxpassages>
            <page>1</page>
        </request>`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api", // Используйте путь к вашему серверу Express
        xmlData,
        {
          headers: {
            "Content-Type": "application/xml", // Указываем, что это XML-данные
            Authorization: "AQVN0qCGDXIufvoikxRcR0ImZiaPAldgTfDJjf-f",
          },
        }
      );
      console.log("Ответ от сервера:", response.data);
      // здесь вы можете обновить состояние вашего компонента,
      // если это необходимо после успешной отправки данных
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return <button onClick={handleClick}>Отправить запрос</button>;
}

import React, { useState } from "react";
import axios from "axios";
import s from "./Form.module.css";

export default function ApiSendYaSearch() {
  const [query, setQuery] = useState(""); // Состояние для хранения значения ввода
  const [titleValues, setTitleValues] = useState([]); // Состояние для хранения значений заголовков

  const handleClick = async () => {
    const xmlData = `<?xml version="1.0" encoding="utf-8"?>
        <request>
        <query>${query}</query>
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
        xmlData
      );
      console.log("Ответ от сервера:", response.data);
      const xmlResponse = response.data;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
      const titles = xmlDoc.getElementsByTagName("title");
      const newTitleValues = [];
      for (let i = 0; i < titles.length; i++) {
        const title = getTextContentWithTags(titles[i]); // Используем рекурсивный обход DOM
        newTitleValues.push(title);
      }
      setTitleValues(newTitleValues); // Обновляем состояние с заголовками
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  // Функция для извлечения текстового содержимого с учетом вложенных тегов
  const getTextContentWithTags = (node) => {
    let text = "";
    for (let child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName === "hlword") {
          text += child.textContent;
        } else {
          text += getTextContentWithTags(child);
        }
      }
    }
    return text;
  };

  const handleChange = (event) => {
    setQuery(event.target.value); // Обновляем значение состояния при изменении ввода
  };
  return (
    <>
      <label htmlFor="key-get">Создай правильный тайтл</label>
      <input
        placeholder="Впиши ключевой запрос"
        type="text"
        name="key-get"
        id="key-get"
        value={query}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Отправить запрос</button>
      {/* Вывод заголовков */}
      <ul>
        {titleValues.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </>
  );
}

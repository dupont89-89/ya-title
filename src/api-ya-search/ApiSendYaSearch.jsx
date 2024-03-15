import React, { useState } from "react";
import axios from "axios";
import s from "./Form.module.css";
import t from "./../css/Tools.module.css";
import config from "./../config";

const serverUrl = `${config.REACT_APP_SERVER_URL}:${config.REACT_APP_PORT}`;

export default function ApiSendYaSearch() {
  const [query, setQuery] = useState(""); // Состояние для хранения значения ввода
  const [titleValues, setTitleValues] = useState([]); // Состояние для хранения значений заголовков
  const [repeatWords, setRepeatWords] = useState([]); // Состояние для хранения повторяющихся слов
  const [resultString, setResultString] = useState(""); // Состояние для хранения строки с первыми 8 словами

  const handleClick = async () => {
    const xmlData = `<?xml version="1.0" encoding="utf-8"?>
          <request>
          <query>${query}</query>
              <sortby>rlv</sortby>
              <groupings>
                  <groupby attr="d" mode="deep" groups-on-page="20" docs-in-group="1" />
              </groupings>
              <maxpassages>5</maxpassages>
              <page>1</page>
          </request>`;

    try {
      const response = await axios.post(
        `${serverUrl}/api`, // Используйте путь к вашему серверу Express
        xmlData
      );
      console.log("Ответ от сервера:", response.data);
      const xmlResponse = response.data;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
      const titles = xmlDoc.getElementsByTagName("title");
      const newTitleValues = [];
      const wordsCount = {};

      // Обработка заголовков
      for (let i = 0; i < titles.length; i++) {
        let title = getTextContentWithTags(titles[i]); // Используем рекурсивный обход DOM
        title = title.replace(/\.{3}$/, ""); // Удаление символов '...'
        title = title.replace(/[|()'"/]/g, ""); // Удаление символов '|', '—', '–' и ','
        title = title.replace(/[—,-]/g, " "); // Удаление символов '|', '—', '–' и ','
        newTitleValues.push(title);

        const commonPrepositions = [
          "а",
          "и",
          "от",
          "в",
          "по",
          "во",
          "из",
          "тут",
          "на",
          "с",
          "для",
          "ж",
          "та",
          "же",
          "у",
          // Добавьте сюда другие предлоги, которые вы хотите исключить
        ];

        const words = title.split(" ");
        words.forEach((word) => {
          const normalizedWord = word
            .trim()
            .toLowerCase()
            .replace(/[.,!?'"`]/g, ""); // Нормализуем слово
          if (
            normalizedWord !== "" &&
            !commonPrepositions.includes(normalizedWord)
          ) {
            // Проверяем, что слово не пустое и не является предлогом
            if (wordsCount[normalizedWord]) {
              wordsCount[normalizedWord]++;
            } else {
              wordsCount[normalizedWord] = 1;
            }
          }
        });
      }

      // Преобразование объекта в массив и сортировка по количеству повторений
      const sortedWords = Object.entries(wordsCount).sort(
        (a, b) => b[1] - a[1]
      );

      // Выводим первые 8 самых повторяющихся слов
      const filteredWords = sortedWords.filter(([word, count]) => {
        return !/\d/.test(word) && word.indexOf(":") === -1;
      });

      // Удаляем цифры из слов
      const wordsWithoutDigits = filteredWords.map(([word, count]) => {
        return word.replace(/\d/g, "");
      });

      // Выбираем только первые 8 слов без цифр и символа ':'
      const topWords = wordsWithoutDigits.slice(0, 8);
      setResultString(topWords);

      setTitleValues(newTitleValues); // Обновляем состояние с заголовками
      setRepeatWords(sortedWords); // Обновляем состояние с повторяющимися словами
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
      <section className={t.sectionTools}>
        <div className={s.title}>
          <h1>Создай правильный Title</h1>
        </div>
        <div className={s.blockForm}>
          <label htmlFor="key-get">Впиши ключевой запрос</label>
          <div className={s.inputBlockForm}>
            <input
              placeholder="купить птичье молоко оптом"
              type="text"
              name="key-get"
              id="key-get"
              value={query}
              onChange={handleChange}
            />
            <button onClick={handleClick}>Создать тайтл</button>
          </div>
        </div>
        <div className={s.finalTitle}>
          {resultString && resultString.length > 0 && (
            <p>
              {resultString
                .map((word, index) =>
                  index === 0
                    ? word.charAt(0).toUpperCase() + word.slice(1)
                    : word
                )
                .join(" ")}
            </p>
          )}
        </div>
      </section>
      {/* Вывод заголовков */}
      <div className={t.resultSearhTitle}>
        <ul>
          {titleValues.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
      {/* Вывод повторяющихся слов */}
      <div className={t.resultSearhTitle}>
        <h2>Повторяющиеся слова:</h2>
        <ul>
          {repeatWords.map(([word, count], index) => (
            <li key={index}>{`${word}: ${count}`}</li>
          ))}
        </ul>
      </div>
      <div className={t.textBottomTools}>
        <p>
          <b>Ptahini</b> разработал{" "}
          <strong>инструмент для создания “правильного тайтла”</strong>, который
          помогает SEO-специалистам <strong>автоматически</strong> составлять
          заголовки Title <strong>на основе поисковой выдачи</strong>. Этот
          инструмент подбирает самые релевантные, связанные и тематические LSI
          слова и фразы, что позволяет создать заголовок, максимально
          соответствующий поисковым запросам пользователей.
        </p>
      </div>
    </>
  );
}

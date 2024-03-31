import React, { useState } from "react";
import axios from "axios";
import s from "./Form.module.css";
import t from "./../css/Tools.module.css";
import RegionSelectSearch from "../app-function/RegionSelectSearch";
import Loading from "../app-function/Loading";
import TitleValues from "./TitleValues";
import RepeatWords from "./RepeatWords";
import TextBottom from "./TextBottom";
import InputKey from "./InputKey";
import ToolsSidebar from "../Sidebar/ToolSidebar";
import MessageNoAuth from "../Auth/MessageNoAuth/MessageNoAuth";
import ModalNoLvt from "../Modal/ModalNoLvt";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const serverUrl = `${config.REACT_APP_SERVER_URL}`;

export default function ApiSendYaSearch(props) {
  const [query, setQuery] = useState(""); // Состояние для хранения значения ввода
  const [titleValues, setTitleValues] = useState(null); // Состояние для хранения значений заголовков
  const [repeatWords, setRepeatWords] = useState(null); // Состояние для хранения повторяющихся слов
  const [resultString, setResultString] = useState(""); // Состояние для хранения строки с первыми 8 словами
  const [selectedCity, setSelectedCity] = useState("213");
  const [isLoading, setIsLoading] = useState(false); // Состояние для указания на процесс загрузки
  const [topFriLink, setResultWordsLink] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [urlPage, setUrlPage] = useState(null);

  const handleClick = async () => {
    setIsLoading(true); // Устанавливаем состояние загрузки в true при отправке запроса

    if (props.lvt === 0) {
      console.log("Баланс равен 0");
      setIsLoading(false); // Если баланс равен 0, не отправляем запрос и завершаем выполнение функции
      setShowModal(true); // Устанавливаем showModal в true, чтобы показать модальное окно
      return; // Возвращаемся из функции
    }

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
        `${serverUrl}/api/get-title`, // Добавляем selectedCity как параметр запроса
        xmlData,
        { params: { selectedCity: selectedCity } }
      );
      const xmlResponse = response.data;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
      const titles = xmlDoc.getElementsByTagName("title");
      const url = xmlDoc.getElementsByTagName("url");
      const newTitleValues = [];
      const wordsCount = {};

      // Обработка заголовков
      for (let i = 0; i < titles.length; i++) {
        let title = getTextContentWithTags(titles[i]); // Используем рекурсивный обход DOM
        title = title.replace(/\.{3}$/, ""); // Удаление символов '...'
        title = title.replace(/[|()'"/]/g, ""); // Удаление символов '|', '—', '–' и ','
        title = title.replace(/[—\u2013,-]/g, " "); // Удаление символов '|', '—', '–' и ','
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

        const titleWithoutPunctuation = title.replace(/[.,!?'"`]/g, ""); // Удаление знаков препинания
        const normalizedTitle = titleWithoutPunctuation.replace(
          /\bцен[ые]?\b/gi,
          "цена"
        ); // Замена "цены" и "цене" на "цена"
        const words = normalizedTitle.split(/\s+/); // Разделение строки на слова

        words.forEach((word) => {
          const normalizedWord = word.trim().toLowerCase();
          if (
            normalizedWord !== "" &&
            !commonPrepositions.includes(normalizedWord)
          ) {
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
      const topWords = wordsWithoutDigits.slice(0, 10);
      const topWordsLink = wordsWithoutDigits.slice(0, 3);
      setResultString(topWords);
      setResultWordsLink(topWordsLink);
      setTitleValues(newTitleValues); // Обновляем состояние с заголовками
      setRepeatWords(sortedWords); // Обновляем состояние с повторяющимися словами
      setUrlPage(url);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsLoading(false); // Устанавливаем состояние загрузки в false после получения ответа
      props.spendLvtOneTitle(props.userId);
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

  const filterUniqueWords = (words) => {
    const seen = {}; // Объект для отслеживания уже встреченных первых 5 букв
    const uniqueWords = [];

    words.forEach((word) => {
      const firstFive = word.slice(0, 5).toLowerCase(); // Получаем первые 5 букв и приводим к нижнему регистру
      if (!seen[firstFive]) {
        // Если таких первых 5 букв еще не было
        seen[firstFive] = true; // Отмечаем, что эти буквы встретились
        uniqueWords.push(word); // Добавляем слово в список уникальных
      }
    });

    return uniqueWords;
  };

  const handleCitySelect = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  const copyTextOnClick = () => {
    const h2Text = filterUniqueWords(resultString)
      .map((word, index) =>
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      )
      .join(" ");
    navigator.clipboard.writeText(h2Text);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000); // 3 секунды для автоматического скрытия сообщения
  };

  return (
    <div>
      <div className={t.sectionGridSK}>
        <aside>
          <ToolsSidebar />
        </aside>
        <section className={t.sectionTools}>
          <div>
            {/* Ваш JSX код здесь */}
            {showModal && (
              <ModalNoLvt
                isAuthenticated={props.isAuthenticated}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
          <div className={s.title}>
            <h1>Создай правильный Title</h1>
          </div>
          <RegionSelectSearch onSelect={handleCitySelect} />
          <InputKey
            handleChange={handleChange}
            query={query}
            handleClick={handleClick}
          />
          {!props.isAuthenticated ? <MessageNoAuth /> : null}
          {isLoading ? ( // Показываем "ЗАГРУЗКА" во время загрузки
            <Loading />
          ) : (
            // Показываем результат, если загрузка завершена
            resultString &&
            resultString.length > 0 && (
              <div className={s.wrapperBoxTitle}>
                <span className={s.faviconTitle}></span>
                <div className={s.boxTitle}>
                  <h2>
                    {filterUniqueWords(resultString)
                      .map((word, index) =>
                        index === 0
                          ? word.charAt(0).toUpperCase() + word.slice(1)
                          : word
                      )
                      .join(" ")}
                  </h2>
                  <span className={s.linkTopKey}>
                    ptahini.ru›search/
                    {filterUniqueWords(topFriLink)
                      .map((word, index) =>
                        index === 0
                          ? word.charAt(0).toUpperCase() + word.slice(1)
                          : word
                      )
                      .join(" ")}
                  </span>
                  <p>
                    Это лучший тайтл для твоего SEO продвижения сайта. Приведи
                    его к читаемому виду. Добавь его в соответсвующий раздел
                    мета-тегов в своей CMS.
                  </p>
                  <button className={s.btnCopyTitle} onClick={copyTextOnClick}>
                    Копировать Title
                  </button>
                  {copySuccess && (
                    <span className={s.copyMessage}>Title скопирован!</span>
                  )}
                </div>
              </div>
            )
          )}
        </section>
      </div>

      <TitleValues urlPage={urlPage} titleValues={titleValues} />
      <RepeatWords repeatWords={repeatWords} />
      <TextBottom />
    </div>
  );
}

import axios from "axios";
import { DOMParser } from "xmldom";
import dotenv from "dotenv";
import levenshtein from "fast-levenshtein";
import pLimit from "p-limit";
import {
  commerceMarker,
  infoMarker,
  navigationMarker,
  mediaMarker,
  domenInfo,
  domenCommerce,
} from "./dataKey.js";

dotenv.config();

const serverUrl = process.env.SERVER_URL;
const selectedCity = "213";
const limit = pLimit(10); // Ограничиваем количество одновременных запросов до 10

// Функция для вычисления процента совпадения
const similarityPercentage = (str1, str2) => {
  const distance = levenshtein.get(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return ((maxLength - distance) / maxLength) * 100;
};

// Функция для проверки совпадения с порогом
const isMatch = (query, markers, threshold = 83) => {
  const words = query.split(" ");
  for (let i = 0; i < words.length; i++) {
    const queryWord = words[i];
    for (let j = 0; j < markers.length; j++) {
      const markerWord = markers[j];
      const similarity = similarityPercentage(queryWord, markerWord);
      if (similarity >= threshold) {
        return true;
      }
    }
  }
  return false;
};

// Функция для проверки доменов
const checkDomains = (domains, markers) => {
  let matchCount = 0;
  for (let i = 0; i < domains.length; i++) {
    for (let j = 0; j < markers.length; j++) {
      if (domains[i] === markers[j]) {
        matchCount++;
        break;
      }
    }
  }
  return matchCount;
};

export const fetchYandexKey = async (query) => {
  console.log(`Пришел запрос: ${JSON.stringify(query)}`);

  const processQuery = async (q) => {
    const lowerCaseQuery = q.toLowerCase();
    console.log(`Запрос в нижнем регистре: ${lowerCaseQuery}`);

    const matchInfo = isMatch(lowerCaseQuery, infoMarker);
    const matchCommerce = isMatch(lowerCaseQuery, commerceMarker);
    const matchNavigation = isMatch(lowerCaseQuery, navigationMarker);
    const matchMedia = isMatch(lowerCaseQuery, mediaMarker);

    let result;

    if (matchInfo || matchCommerce || matchNavigation || matchMedia) {
      if (matchMedia) result = "Мультимедиа запрос";
      else if (matchNavigation) result = "Навигационный запрос";
      else if (matchInfo) result = "Информационный запрос";
      else if (matchCommerce) result = "Коммерческий запрос";
      console.log(`Проверка по базам: ${result}`);
    } else {
      const xmlData = `<?xml version="1.0" encoding="utf-8"?>
          <request>
            <query>${lowerCaseQuery}</query>
            <sortby>rlv</sortby>
            <groupings>
              <groupby attr="d" mode="deep" groups-on-page="10" docs-in-group="1" />
            </groupings>
            <maxpassages>5</maxpassages>
            <page>1</page>
          </request>`;

      console.log(`Отправка XML-запроса: ${xmlData}`);

      try {
        const response = await axios.post(
          `${serverUrl}/api/get-title`,
          xmlData,
          {
            params: { selectedCity: selectedCity },
            timeout: 30000,
          }
        );
        console.log(`Ответ от сервера: ${JSON.stringify(response.data)}`);

        const xmlResponse = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");

        const domains = xmlDoc.getElementsByTagName("domain");
        const domainValues = [];
        for (let i = 0; i < domains.length; i++) {
          domainValues.push(domains[i].textContent);
        }
        console.log(`Найденные домены: ${domainValues.join(", ")}`);

        const matchDomenInfo = checkDomains(domainValues, domenInfo);
        const matchDomenCommerce = checkDomains(domainValues, domenCommerce);

        const totalMatches = matchDomenInfo + matchDomenCommerce;

        if (totalMatches > 0) {
          const infoPercentage = (
            (matchDomenInfo / totalMatches) *
            100
          ).toFixed(2);
          const commercePercentage = (
            (matchDomenCommerce / totalMatches) *
            100
          ).toFixed(2);

          if (matchDomenInfo && matchDomenCommerce) {
            result = `Смешанная выдача:\n ${infoPercentage}% информационных\n ${commercePercentage}% коммерческих`;
          } else if (matchDomenCommerce) {
            result = "Коммерческий запрос";
          } else if (matchDomenInfo) {
            result = "Информационный запрос";
          }
        } else {
          result = "Общий запрос";
        }
        console.log(`Результат обработки запроса: ${result}`);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        throw error;
      }
    }

    return { query: q, result }; // Возвращаем объект с ключами query и result
  };

  if (Array.isArray(query)) {
    // Если query — массив, обрабатываем каждый элемент параллельно
    console.log("Обработка массива запросов");
    const results = await Promise.all(
      query.map((q) => limit(() => processQuery(q)))
    );
    console.log("Результаты обработки массива запросов:", results);
    return results; // Возвращаем массив объектов
  } else {
    // Если query — строка, обрабатываем как единичный запрос, но возвращаем массив
    console.log("Обработка единичного запроса");
    const result = await limit(() => processQuery(query));
    console.log("Результат обработки единичного запроса:", result);
    return [result]; // Возвращаем массив с одним объектом
  }
};

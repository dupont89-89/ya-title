const axios = require("axios");
const { DOMParser } = require("xmldom");
require("dotenv").config();
const levenshtein = require("fast-levenshtein");
const {
  commerceMarker,
  infoMarker,
  navigationMarker,
  mediaMarker,
  domenInfo,
  domenCommerce,
} = require("./dataKey");

const serverUrl = process.env.SERVER_URL;
const selectedCity = "213";

// Функция для вычисления процента совпадения
const similarityPercentage = (str1, str2) => {
  const distance = levenshtein.get(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return ((maxLength - distance) / maxLength) * 100;
};

// Функция для проверки совпадения с порогом
const isMatch = (query, markers, threshold = 88) => {
  const words = query.split(" "); // Разбиваем запрос на слова
  for (let i = 0; i < words.length; i++) {
    const queryWord = words[i];
    for (let j = 0; j < markers.length; j++) {
      const markerWord = markers[j];
      const similarity = similarityPercentage(queryWord, markerWord);
      console.log(
        `Сравнение "${queryWord}" с "${markerWord}" дает ${similarity}% совпадения`
      );
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

const fetchYandexKey = async (query) => {
  // Приводим query к нижнему регистру
  const lowerCaseQuery = query.toLowerCase();
  console.log(`Запрос в нижнем регистре: ${lowerCaseQuery}`);

  // Проверка на совпадение с query из слов из массивов
  const matchInfo = isMatch(lowerCaseQuery, infoMarker);
  const matchCommerce = isMatch(lowerCaseQuery, commerceMarker);
  const matchNavigation = isMatch(lowerCaseQuery, navigationMarker);
  const matchMedia = isMatch(lowerCaseQuery, mediaMarker);

  // Если совпадение найдено, возвращаем ответ на фронтенд
  if (matchInfo || matchCommerce || matchNavigation || matchMedia) {
    if (matchMedia) {
      console.log("Совпадение в массиве Мультимедиа запрос");
      return "Мультимедиа запрос";
    }
    if (matchNavigation) {
      console.log("Совпадение в массиве Навигационный запрос");
      return "Навигационный запрос";
    }
    if (matchInfo) {
      console.log("Совпадение в массиве Информационный запрос");
      return "Информационный запрос";
    }
    if (matchCommerce) {
      console.log("Совпадение в массиве Коммерческий запрос");
      return "Коммерческий запрос";
    }
  }

  console.log("Совпадений не найдено, отправка запроса на сервер.");

  // Выполнить запрос, если совпадений нет
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

  try {
    const response = await axios.post(`${serverUrl}/api/get-title`, xmlData, {
      params: { selectedCity: selectedCity },
    });
    const xmlResponse = response.data;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");

    // Получаем все элементы <domain>
    const domains = xmlDoc.getElementsByTagName("domain");
    const domainValues = [];
    for (let i = 0; i < domains.length; i++) {
      domainValues.push(domains[i].textContent);
    }

    console.log(domainValues);

    // Проверка доменов
    const matchDomenInfo = checkDomains(domainValues, domenInfo);
    const matchDomenCommerce = checkDomains(domainValues, domenCommerce);

    const totalMatches = matchDomenInfo + matchDomenCommerce;

    if (totalMatches > 0) {
      const infoPercentage = ((matchDomenInfo / totalMatches) * 100).toFixed(2);
      const commercePercentage = (
        (matchDomenCommerce / totalMatches) *
        100
      ).toFixed(2);

      if (matchDomenInfo && matchDomenCommerce) {
        console.log("Совпадение в обоих массивах domenInfo и domenCommerce");
        return `Смешанная выдача: ${infoPercentage}% информационных, ${commercePercentage}% коммерческих`;
      } else if (matchDomenCommerce) {
        console.log("Совпадение в массиве domenCommerce");
        return "Коммерческий запрос";
      } else if (matchDomenInfo) {
        console.log("Совпадение в массиве domenInfo");
        return "Информационный запрос";
      }
    } else {
      console.log("Совпадений не найдено в доменах");
      return "Общий запрос";
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};

module.exports = { fetchYandexKey };

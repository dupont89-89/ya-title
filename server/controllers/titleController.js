const axios = require("axios");
const { DOMParser } = require("xmldom");
require("dotenv").config();
const findDuplicateWords = require("./../utils/PovtorWords/PovtorWords");

const serverUrl = process.env.SERVER_URL;

exports.getTitle = async (req, res) => {
  const { query, selectedCity } = req.body;

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
    const response = await axios.post(`${serverUrl}/api/get-title`, xmlData, {
      params: { selectedCity },
    });
    const xmlResponse = response.data;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
    const titles = xmlDoc.getElementsByTagName("title");
    const urls = xmlDoc.getElementsByTagName("url"); // Изменено: url -> urls
    const newTitleValues = [];
    const wordsCount = {};

    for (let i = 0; i < titles.length; i++) {
      let title = getTextContentWithTags(titles[i]);
      title = title
        .replace(/\.{3}$/, "")
        .replace(/[|()'"/]/g, "")
        .replace(/[—\u2013,-]/g, " ");
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
        "о",
        "как",
        "все",
        "что",
        "это",
      ];
      const normalizedTitle = title.replace(/[.,!?'"`]/g, "");
      const words = normalizedTitle.split(/\s+/);

      words.forEach((word) => {
        const normalizedWord = word.trim().toLowerCase();
        if (
          normalizedWord !== "" &&
          !commonPrepositions.includes(normalizedWord)
        ) {
          wordsCount[normalizedWord] = (wordsCount[normalizedWord] || 0) + 1;
        }
      });
    }

    const sortedWords = Object.entries(wordsCount).sort((a, b) => b[1] - a[1]);
    const filteredWords = sortedWords.filter(
      ([word]) => !/\d/.test(word) && word.indexOf(":") === -1
    );
    const wordsWithoutDigits = filteredWords.map(([word]) =>
      word.replace(/\d/g, "")
    );
    const wordsWithoutDigitsString = wordsWithoutDigits.join(" ");
    const numberArray = findDuplicateWords(wordsWithoutDigitsString, 70);
    let wordsArray = wordsWithoutDigitsString.split(" ");

    if (typeof numberArray === "object") {
      const { duplicatesChains } = numberArray;
      if (Array.isArray(duplicatesChains)) {
        duplicatesChains.forEach((indexes) => {
          if (indexes.length > 0) {
            const firstIndex = indexes[0];
            for (let i = 1; i < indexes.length; i++) {
              wordsArray[indexes[i]] = "";
            }
          }
        });
      }
    }

    wordsArray = wordsArray.filter((word) => word !== "");
    const newWordsString = wordsArray.join(" ");
    const topWords = wordsArray.slice(0, 10);
    const topWordsLink = wordsWithoutDigits.slice(0, 3);

    // Обработка urls для исключения циклических ссылок
    const urlArray = [];
    for (let i = 0; i < urls.length; i++) {
      urlArray.push(urls[i].textContent);
    }

    res.json({
      topWords,
      topWordsLink,
      titleValues: newTitleValues,
      repeatWords: sortedWords,
      urlPage: urlArray, // Изменено: urls -> urlArray
    });
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

function getTextContentWithTags(node) {
  let text = "";
  if (!node || !node.childNodes) {
    return text;
  }

  for (let i = 0; i < node.childNodes.length; i++) {
    let child = node.childNodes[i];
    if (child.nodeType === 3) {
      // Node.TEXT_NODE
      text += child.textContent;
    } else if (child.nodeType === 1) {
      // Node.ELEMENT_NODE
      if (child.tagName === "hlword") {
        text += child.textContent;
      } else {
        text += getTextContentWithTags(child);
      }
    }
  }
  return text;
}

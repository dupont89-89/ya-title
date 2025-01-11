import pLimit from "p-limit";
import sharp from "sharp";
import axios from "axios";
import tesseract from "tesseract.js";
import { Iks } from "../models/YaIksToolsSchema.js"; // Убедитесь, что путь к модели верный

export const getIksContController = async (req, res) => {
  console.log("Получен запрос на обработку доменов:", req.body);

  // Проверка, что данные являются массивом
  if (!Array.isArray(req.body)) {
    console.error("Ошибка: Данные не являются массивом доменов.");
    return res
      .status(400)
      .send({ message: "Пожалуйста, передайте массив доменов." });
  }

  // Фильтрация и очистка доменов
  const domains = req.body
    .map((domain) => {
      try {
        // Удаление протоколов, путей и приведение к нижнему регистру
        let cleanDomain = domain
          .replace(/https?:\/\//, "") // Удаление http/https
          .replace(/\/.*/, "") // Удаление пути или параметров
          .toLowerCase(); // Приведение к нижнему регистру

        // Проверка, что домен не пустой
        if (!cleanDomain) {
          throw new Error("Пустой домен");
        }

        // Преобразование домена в Punycode (если требуется)
        cleanDomain = new URL(`http://${cleanDomain}`).hostname;
        return cleanDomain;
      } catch (error) {
        console.error(`Ошибка обработки домена "${domain}":`, error.message);
        return null; // Пропускаем некорректные домены
      }
    })
    .filter((domain) => domain !== null); // Удаляем null (некорректные домены)

  console.log("Очищенные домены:", domains);

  // Если нет доменов для обработки
  if (domains.length === 0) {
    return res
      .status(400)
      .send({ message: "Нет корректных доменов для обработки." });
  }

  const resultsMap = new Map();
  const limit = pLimit(100); // Ограничение на количество одновременных запросов

  const processDomain = async (domain) => {
    const imageUrl = `https://webmaster.yandex.ru/sqicounter?${domain}&theme=light&lang=ru`;

    try {
      // Загрузка изображения
      const response = await axios({
        url: imageUrl,
        method: "GET",
        responseType: "arraybuffer",
      });

      // Обработка изображения
      const processedImage = await sharp(response.data)
        .resize({ width: 190 })
        .linear(1.5, -10)
        .sharpen()
        .toBuffer();

      // Распознавание текста с помощью Tesseract
      const { data: recognition } = await tesseract.recognize(
        processedImage,
        "eng",
        {
          logger: (info) => console.log(info),
          tessedit_char_whitelist: "0123456789",
        }
      );

      // Очистка и преобразование текста
      const cleanedText = recognition.text.replace(/[^0-9]/g, "").trim();
      const value = cleanedText ? parseInt(cleanedText, 10) : 0;

      // Сохранение результата в базу данных
      await Iks.updateOne(
        { domen: domain },
        { $push: { checks: { iksValue: value } } },
        { upsert: true } // Создаем новую запись, если домен не найден
      );

      // Сохраняем результат для ответа
      resultsMap.set(domain, { site: domain, sqi: value });
    } catch (error) {
      console.error(`Ошибка обработки домена ${domain}:`, error.message);
      resultsMap.set(domain, { site: domain, sqi: 0 });
    }
  };

  // Обработка всех доменов с ограничением на количество одновременных запросов
  const tasks = domains.map((domain) => limit(() => processDomain(domain)));
  await Promise.all(tasks);

  // Преобразуем результаты в массив
  const finalResults = Array.from(resultsMap.values());

  console.log("Результаты обработки доменов:", finalResults);

  return res.status(200).send({
    message: "Сбор информации о ИКС сайтов завершен",
    results: finalResults,
  });
};

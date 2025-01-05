const pLimit = require("p-limit").default || require("p-limit");
const sharp = require("sharp");
const axios = require("axios");
const tesseract = require("tesseract.js");

exports.getIksContController = async (req, res) => {
  console.log("Получен запрос на обработку доменов:", req.body);

  if (!Array.isArray(req.body)) {
    console.error("Ошибка: Данные не являются массивом доменов.");
    return res
      .status(400)
      .send({ message: "Пожалуйста, передайте массив доменов." });
  }

  const domains = req.body;
  const resultsMap = new Map();
  const limit = pLimit(100);

  const processDomain = async (domain, id) => {
    const imageUrl = `https://webmaster.yandex.ru/sqicounter?${domain}&theme=light&lang=ru`;

    try {
      const response = await axios({
        url: imageUrl,
        method: "GET",
        responseType: "arraybuffer",
      });

      // Предобработка изображения
      const processedImage = await sharp(response.data)
        .resize({ width: 190 }) // Ограничиваем размер
        .linear(1.5, -10)
        .sharpen()
        // .grayscale() // Черно-белое изображение
        .toBuffer();

      // Запуск OCR
      const { data: recognition } = await tesseract.recognize(
        processedImage,
        "eng",
        {
          logger: (info) => console.log(info),
          tessedit_char_whitelist: "0123456789", // Только цифры
        }
      );

      // Очистка текста и извлечение числа
      const cleanedText = recognition.text.replace(/[^0-9]/g, "").trim();
      const value = cleanedText ? parseInt(cleanedText, 10) : 0;

      // Добавляем результат в Map
      resultsMap.set(domain, { site: domain, sqi: value });
    } catch (error) {
      console.error(`Ошибка обработки домена ${domain}:`, error.message);
      resultsMap.set(domain, { site: domain, sqi: 0 });
    }
  };

  const tasks = domains.map((domain, index) =>
    limit(() => processDomain(domain, index + 1))
  );

  await Promise.all(tasks);

  const finalResults = Array.from(resultsMap.values());

  console.log("Результаты обработки доменов:", finalResults);

  return res.status(200).send({
    message: "Сбор информации о ИКС сайтов завершен",
    results: finalResults,
  });
};

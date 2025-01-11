import { getData, getClientsUnits } from "./../api-direct/fetch-api-direct.js";

// Функция для разбивки массива на части по n элементов
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export const apiDirectWordContController = async (req, res) => {
  try {
    const geoId = req.query.region;
    const phrases = req.body;

    // Разбиваем массив фраз на части по 10 элементов
    const chunks = chunkArray(phrases, 10);

    // Обрабатываем каждую часть параллельно
    const results = await Promise.all(
      chunks.map(async (chunk) => {
        return await getData(chunk, [geoId]);
      })
    );

    // Объединяем результаты в один массив
    const combinedResults = results.flat();

    return res.status(200).send({
      message: "Проверка частотности закончена",
      result: combinedResults,
    });
  } catch (error) {
    console.error("Ошибка в apiDirectController:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};

export const apiDirectBallContController = async (req, res) => {
  try {
    const result = await getClientsUnits();
    console.log(`Результат в контроллере: ${JSON.stringify(result)}`);

    if (result) {
      const ball = result / 10;
      console.log(`Результат в контроллере-2: ${ball}`);

      return res.status(200).send({
        message: "Кол-во доступных баллов проверки",
        result: ball,
      });
    } else {
      console.error("Недостаточно данных в ответе");
      return res.status(400).send({ message: "Недостаточно данных в ответе" });
    }
  } catch (error) {
    console.error("Ошибка в apiDirectController:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};

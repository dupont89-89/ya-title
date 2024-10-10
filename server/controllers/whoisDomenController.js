const { fetchApiWhois } = require("../api-whois/fetch-api-whois");
const { Whois } = require("../models/WhoisToolsSchema");

// Запрос к API whois сервиса
exports.whoisDomenController = async (req, res) => {
  const domen = req.query.domen;
  try {
    const result = await fetchApiWhois(domen);

    if (result) {
      return res.status(200).send(result);
    } else {
      console.error("Данные от WHOIS не пришли");
      return res.status(400).send({ message: "Данные от WHOIS не пришли" });
    }
  } catch (error) {
    console.error("Ошибка в Whois контроллере whoisDomenController:", error);
    return res.status(500).send({
      message: "Внутренняя ошибка сервера. Ошибка в whoisDomenController",
    });
  }
};

// Пользователь подписывается на освобождение домена
exports.whoisDomenSubscriptionController = async (req, res) => {
  const domen = req.query.domen;
  const userId = req.query.userId;
  const freeData = req.query.freeData;
  const email = req.query.email;
  try {
    await Whois.create({
      userId: userId,
      email: email,
      subscriptionFreeDomen: {
        domen: domen,
        freeData: freeData,
      },
    });

    // Успешный ответ
    return res.status(200).send({ message: "Подписка успешно создана" });
  } catch (error) {
    console.error(
      "Ошибка в Whois контроллере whoisDomenSubscriptionController:",
      error
    );
    return res.status(500).send({
      message:
        "Внутренняя ошибка сервера. Ошибка в whoisDomenSubscriptionController",
    });
  }
};

// Получаем домены на которые подписан пользователь
exports.getDomenSubscriptionController = async (req, res) => {
  try {
    // Находим все записи по userId
    const subscriptionDomen = await Whois.find({ userId: req.query.userId });

    if (subscriptionDomen && subscriptionDomen.length > 0) {
      // Если записи найдены, проходим по массиву и собираем данные
      const domenData = subscriptionDomen
        .map((subscription) => {
          if (subscription.subscriptionFreeDomen) {
            return {
              domen: subscription.subscriptionFreeDomen.domen,
              freeData: subscription.subscriptionFreeDomen.freeData,
            };
          }
          return null;
        })
        .filter(Boolean); // Убираем пустые значения
      // Отправляем данные в ответе
      res.status(200).json({ domenData });
    } else {
      // Если записей не найдено
      res.status(404).json({ message: "Подписки на домены не найдены" });
    }
  } catch (error) {
    // Ловим любые ошибки и отправляем ответ с ошибкой 500
    console.error(
      "Ошибка при извлечении данных о подписке освобождающегося домена:",
      error
    );
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
